const { RequestHandler, RequestResponse } = require("./RequestHandler");
const config = require('../Config.json');

class MenuHandler extends RequestHandler
{
    requests = {
        "/userInfo": this.getUserInfo.bind(this),
        "/userPosts": this.getUserPosts.bind(this),
        "/globalPosts": this.getGlobalPosts.bind(this),
        "/getComments": this.getComments.bind(this),
        "/post": this.post.bind(this),
        "/removePost": this.removePost.bind(this),
        "/comment": this.comment.bind(this),
        "/removeComment": this.removeComment.bind(this),
        "/like": this.like.bind(this),
        "/subscribe": this.subscribe.bind(this),
        "/logout": this.logout.bind(this),
        "/deleteUser": this.deleteUser.bind(this)
    };

    constructor (managers, cookie, userId)
    {
        super(managers, cookie);
        this.userId = userId;
    }

    // method returns user's subscriber count and points
    async getUserInfo({ userId })
    {
        let id = userId ?? this.userId;
        if (!await this.managers.loginManager.userExists(id))
        {
            return new RequestResponse({ ok: false, error: "User doesn't exist" });
        }
        try
        {
            return new RequestResponse({ ok: true, ...await this.managers.menuManager.getUserInfo(id) });
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
    }

    // method returns user's posts in order, not all at once
    async getUserPosts({ userId, previousIDs, filter })
    {
        let id = userId ?? this.userId;
        if (!await this.managers.loginManager.userExists(id))
        {
            return new RequestResponse({ ok: false, error: "User doesn't exist" });
        }
        try
        {
            return new RequestResponse({
                ok: true,
                posts: await this.managers.menuManager.getUserPosts(id, previousIDs, filter)
            });
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
    }

    // method returns posts from all users
    async getGlobalPosts({ previousIDs, filter })
    {
        try
        {
            return new RequestResponse({
                ok: true,
                posts: await this.managers.menuManager.getGlobalPosts(previousIDs, filter)
            });
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
    }

    // method gets comments from their parent (post / another comment)
    async getComments({ parentId, previousIDs, filter })
    {
        if (!await this.managers.menuManager.objectIdExists(parentId))
        {
            return new RequestResponse({ ok: false, error: "Comment's parent doesn't exist" });
        }
        try
        {
            return new RequestResponse({
                ok: true,
                comments: await this.managers.menuManager.getComments(parentId, previousIDs, filter)
            });
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
    }

    // method publishes a post as the current user
    async post({ title, content })
    {
        let postLength = title.length + content.length;
        if (postLength === 0)
            return new RequestResponse({ ok: false, error: "Can't publish an empty post" });
        else if (config.POST_CHAR_LIMIT < postLength)
            return new RequestResponse({ ok: false, error: `Post too long (over ${config.POST_CHAR_LIMIT} characters` });
        else if (config.POST_TITLE_CHAR_LIMIT < title.length)
            return new RequestResponse({ ok: false, error: `Title too long (over ${config.POST_TITLE_CHAR_LIMIT} characters` });
        try
        {
            await this.managers.menuManager.addPost(title, content);
            return new RequestResponse({ ok: true });
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
    }

    // method removes one of this user's posts
    async removePost({ postId })
    {
        if (!await this.managers.menuManager.postExists(postId))
            return new RequestResponse({ ok: false, error: "Post doesn't exist" });
        if (await this.managers.menuManger.getPostOwner(postId) != this.userId)
            return new RequestResponse({ ok: false, error: "You can't delete a post which isn't yours" });
        try
        {
            await this.managers.menuManager.removePost(postId);
            return new RequestResponse({ ok: true });
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
    }

    // method adds a comment to a certain parent (post / comment)
    async comment({ parentId, content })
    {
        if (content.length === 0)
            return new RequestResponse({ ok: true, error: "Can't publish an empty comment" });
        else if (config.COMMENT_CHAR_LIMIT < content.length)
            return new RequestResponse({ ok: false, error: `Comment too long (over ${config.COMMENT_CHAR_LIMIT} characters)` });
        if (!await this.managers.menuManager.objectIdExists(parentId))
            return new RequestResponse({ ok: false, error: "Comment's parent doesn't exist" });
        try
        {
            await this.managers.menuManager.addComment(this.userId, parentId, content);
            return new RequestResponse({ ok: true });
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
    }
    
    // method removes one of this user's comments
    async removeComment({ commentId })
    {
        if (!await this.managers.menuManager.commentExists(commentId))
            return new RequestResponse({ ok: false, error: "Post doesn't exist" });
        if (await this.managers.menuManger.getCommentOwner(commentId) != this.userId)
            return new RequestResponse({ ok: false, error: "You can't delete a comment which isn't yours" });
        try
        {
            await this.managers.menuManager.removeComment(commentId);
            return new RequestResponse({ ok: true });
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
    }

    // method likes a post / comment
    async like({ objectId, value })
    {
        if (!await this.managers.menuManager.objectIdExists(objectId))
            return new RequestResponse({ ok: false, error: "Liked object does not exist" });
        let currentLikeValue = 0, type;
        try
        {
            type = await this.managers.menuManager.objectType();
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
        // get current like value from this user
        try
        {
            currentLikeValue = await this.managers.menuManager.getLikeValue(this.userId, objectId);
        }
        catch (error) { }
        // update like value
        try
        {
            await this.managers.menuManager.like(this.userId, objectId, value);
            if (type === "comment")
                await this.managers.menuManager.addCommentLikes(value - currentLikeValue);
            else if (type === "post")
                await this.managers.menuManager.addPostLikes(value - currentLikeValue);
            return new RequestResponse({ ok: true });
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
    }

    // method toggles a subscription of a certain user from this user
    async subscribe({ userId })
    {
        if (!await this.managers.loginManager.userExists(userId))
            return new RequestResponse({ ok: false, error: "User doesn't exist" });
        if (userId === this.userId)
            return new RequestResponse({ ok: false, error: "Can't subscribe to yourself" });
        let isSubscribed;
        // get current value
        try
        {
            isSubscribed = await this.managers.menuManager.isSubscribed(this.userId, userId);
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
        // update like value
        try
        {
            await this.managers.menuManager.subscribe(this.userId, userId);
            await this.managers.menuManager.addSubscribers(isSubscribed ? -1 : 1);
            return new RequestResponse({ ok: true });
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
    }

    // method logs out of this user
    async logout()
    {
        this.managers.cookieManager.removeCookie(this.cookie);
        return new RequestResponse({ ok: true });
    }

    // method deletes this user permanently
    async deleteUser({ password })
    {
        try
        {
            if (await this.managers.loginManager.passwordValid(this.userId, password))
            {
                await this.managers.loginManager.deleteUser(this.userId);
                return new RequestHandler({ ok: true });
            }
            else
                return new RequestHandler({ ok: false, error: "Invalid password" });
        }
        catch (error)
        {
            return new RequestHandler({ ok: false, error: error.message });
        }
    }
}
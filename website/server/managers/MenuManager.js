


class MenuManager
{
    constructor(database)
    {
        this.database = database;
        

    }

    //add a post to the db 
    addPost(authorId, title, content)
    {
        this.database.run(`INSERT INTO Posts(author_id, title, content) VALUES (?, ?, ?);`, [authorId, title, content]);
    }

    //remove a post from the db
    removePost(postId)
    {

    }

    //add a commant
    addComment(authorId, parentId, content)
    {

    }

    //remove a comment
    removeComment()
    {

    }

    //add a subscribe to the user
    subscribe(srdId, dstId)
    {

    }

    //add a like to a object
    like(userId, objectId, value)
    {

    }
}



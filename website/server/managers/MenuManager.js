class MenuManager
{
	constructor(database)
	{
		this.database = database;
	}

	//add a post to the db
	addPost(authorId, title, content)
	{
		this.database.run(`INSERT INTO Posts(author_id, title, content) VALUES (?, ?, ?);`,[authorId, title, content]);
	}

	//add a commant
	addComment(authorId, parentId, content)
	{
		this.database.run(`INSERT INTO Comments(author_id, object_id, content) VALUES(?, ?, ?);`, [authorId, parentId, content]);
	}

	//add a subscribe to the user
	subscribe(srdId, dstId)
	{
		this.database.run(`INSERT INTO Subscribers(src_user, dst_user) VALUES(?, ?);`, [srdId, dstId]);
	}

	//add a like to a object
	like(userId, objectId, value)
	{
		this.database.run(`INSERT INTO Likes(user_id, object_id, value) VALUES (?, ?, ?)`, [userId, objectId, value]);
	}

	//add likes to comment
	addCommentLikes(commentId, amount)
	{
		this.database.run(`UPDATE Comments SET like_value = like_value + ? WHERE id = ? `, [amount, commentId]);
	}

	//add likes to post
	addPostLikes(postId, amount)
	{
		this.database.run(
      `UPDATE Posts SET like_value = like_value + ? WHERE id = ?`,
      [amount, postId]
    );
	}

	//add subscribers
	addSubscribers(userId, amount)
	{
		this.database.run(
      `UPDATE Users SET subscriber_count = subscriber_count + ? WHERE id = ?`,
      [amount, userId]
    );
	}

	//remove a post from the db
	async removePost(postId) { }

	//remove a comment
	async removeComment() { }

	//get like values
	async getLikeValue(userId, objectId) { }

	//get all the info about the user
	async getUserInfo(userId) { }

	//get all the posts of the user
	async getUserPosts(userId, previousIDs, sortBy) { }

	//get all the posts
	async getGlobalPosts(previousIDs, sortBy) { }

	//get all the comments of object and filter it
	async getComments(parentId, previousIDs, sortBy) { }

	//get user by the post
	async getPostOwner(postId) { }

	//get user by the comment
	async getCommentOwner(commentId) { }

	//check if object exists
	async objectIdExists(id) { }

	//check if post exist
	async postExists(id) { }

	//check if comment exist
	async commentExists(id) { }

	//check if subscribed
	async isSubscribed(srcId, destId) { }

	//get the type of the object
	async objectType(id) { }
}

module.exports = MenuManager;

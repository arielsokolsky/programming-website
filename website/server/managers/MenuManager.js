class MenuManager
{
	constructor(database)
	{
		this.database = database;
	}

	//add a post to the db
	addPost(authorId, title, content)
	{
		this.database.run(`INSERT INTO Posts(author_id, title, content) VALUES (?, ?, ?);`, [authorId, title, content]).catch(console.log);
	}

	//add a commant
	addComment(authorId, parentId, content)
	{
		this.database.run(`INSERT INTO Comments(author_id, object_id, content) VALUES(?, ?, ?);`, [authorId, parentId, content]).catch(console.log);
	}

	//add a subscribe to the user
	subscribe(srdId, dstId)
	{
		this.database.run(`INSERT INTO Subscribers(src_user, dst_user) VALUES(?, ?);`, [srdId, dstId]).catch(console.log);
	}

	//add a like to a object
	like(userId, objectId, value)
	{
		this.database.run(`INSERT INTO Likes(user_id, object_id, value) VALUES (?, ?, ?)`, [userId, objectId, value]).catch(console.log);
	}

	//add likes to comment
	addCommentLikes(commentId, amount)
	{
		this.database.run(`UPDATE Comments SET like_value = like_value + ? WHERE id = ? `, [amount, commentId]).catch(console.log);
	}

	//add likes to post
	addPostLikes(postId, amount)
	{
		this.database.run(`UPDATE Posts SET like_value = like_value + ? WHERE id = ?`, [amount, postId]).catch(console.log);
	}

	//add subscribers
	addSubscribers(userId, amount)
	{
		this.database.run(`UPDATE Users SET subscriber_count = subscriber_count + ? WHERE id = ?`, [amount, userId]).catch(console.log);
	}

	//remove a post from the db
	removePost(postId)
	{
		this.database.run(`DELETE FROM Posts WHERE id = ?`, [postId]).catch(console.log);
	}

	//remove a comment
	removeComment(commentId)
	{
		this.database.run(`DELETE FROM Comments WHERE id = ?`, [commentId]).catch(console.log);
	}

	//get like values
	async getLikeValue(userId, objectId)
	{
		return await this.database.get('SELECT value FROM Users WHERE user_id = ? AND object_id = ? ', [userId, objectId]);
	}

	//get all the info about the user
	async getUserInfo(userId)
	{
		return await this.database.select('SELECT points, subscriber_count FROM Users WHERE id = ?', [userId]);
	}

	//get user by the post
	async getPostOwner(postId)
	{
		return await this.database.get('SELECT author_id FROM Posts WHERE id = ?', [postId]);
	}

	//get user by the comment
	async getCommentOwner(commentId)
	{
		return await this.database.get('SELECT author_id FROM Comments WHERE id = ?', [commentId]);
	}

	//check if object exists
	async objectIdExists(id)
	{
		return (await this.database.get('SELECT id FROM ObjectId WHERE id = ?', [id])) == id;
	}

	//check if post exist
	async postExists(id)
	{
		return (await this.database.get("SELECT id FROM Posts WHERE id = ?", [id])) == id;
	}

	//check if comment exist
	async commentExists(id)
	{
		return (await this.database.get("SELECT id FROM Comments WHERE id = ?", [id])) == id;
	}

	//check if subscribed
	async isSubscribed(srcId, dstId)
	{
		return (await this.database.get("SELECT src_user FROM Posts WHERE src_user = ? AND dst_user = ?", [srcId, dstId])) == srcId;
	}


	//get the type of the object
	async objectType(id)
	{
		return (await this.database.get("SELECT id FROM Comments WHERE id = ?"), [id]) == id ? "comment" : "post";
	}

	//get all the posts
	async getGlobalPosts(previousIDs, filter)
	{
		let sortBy;
		if (filter.type == "likes")
		{
			sortBy = "like_value";
		}
		else if (filter.type == "time") 
		{
			sortBy = "id";
		}
				else
		{
			throw ("error: invalid filter");
		}
		return (await this.database.select('SELECT title, content FROM Posts WHERE id IS NOT ? AND title LIKE "%?%" ORDER BY ?', [previousIDs, filter.content, sortBy]));
	}
	
	//get all the posts of the user
	async getUserPosts(userId, previousIDs, filter)
	{
		let sortBy;
		if (filter.type == "likes")
		{
			sortBy = "like_value";
		}
		else if (filter.type == "time") 
		{
			sortBy = "id";
		}
		else
		{
			throw ("error: invalid filter");
		}
		return (await this.database.select('SELECT title, content FROM Posts WHERE id IS NOT ? AND title LIKE "%?%" AND author_id = ? ORDERY BY ?'), [previousIDs, filter.content, userId, sortBy]);
	}

	//get all the comments of object and filter it
	async getComments(parentId, previousIDs, filter)
	{
		let sortBy;
		if (filter.type == "likes")
		{
			sortBy = "like_value";
		}
		else if (filter.type == "time") 
		{
			sortBy = "id";
		}
		else
		{
			throw ("error: invalid filter");
		}
		return ;
	}
}

module.exports = MenuManager;

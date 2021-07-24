class MenuManager {
  constructor(database) {
    this.database = database;
  }

  //add a post to the db
  async addPost(authorId, title, content) {}

  //remove a post from the db
  async removePost(postId) {}

  //add a commant
  async addComment(authorId, parentId, content) {}

  //remove a comment
  async removeComment() {}

  //add a subscribe to the user
  async subscribe(srdId, dstId) {}

  //add a like to a object
  async like(userId, objectId, value) {}

  //get like values
  async getLikeValue(userId, objectId) {}

  //check if subscribed
  async isSubscribed(srcId, dstId) {}

  //add likes to comment
  async addCommentLikes(commentId, amount) {}

  //add likes to post
  async addPostLikes(postId, amount) {}

  //add subscribers
  async addSubscribers(userId, amount) {}

  //get all the info about the user
  async getUserInfo(userId) {}

  //get all the posts of the user
  async getUserPosts(userId, previousIDs, sortBy) {}

  //get all the posts
  async getGlobalPosts(previousIDs, sortBy) {}

  //get all the comments of object and filter it
  async getComments(parentId, previousIDs, sortBy) {}

  //get user by the post
  async getPostOwner(postId) {}

  //get user by the comment
  async getCommentOwner(commentId) {}

  //check if object exists
  async objectIdExists(id) {}

  //check if post exist
  async postExists(id) {}

  //check if comment exist
  async commentExists(id) {}

  //get the type of the object
  async objectType(id) {}
}

const CookieManager = require('./CookieManager');
const LoginManager = require('./LoginManager');
const MenuManager = require('./MenuManager');

// file manages manager objects
class Managers
{
    constructor (database)
    {
        this.initDatabase(database);
        this.cookieManager = new CookieManager();
        this.loginManager = new LoginManager(database);
        this.MenuManager = new MenuManager(database);
    }
    // method creates database's tables
    initDatabase(database)
    {
        database
          .run(
            `CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL UNIQUE,
            points INTEGER DEFAULT 0,
            subscriber_count INTEGER DEFAULT 0
            );`
          )
          .catch(console.log);
        
        //create Posts
        database.run(
            `CREATE TABLE IF NOT EXISTS Posts (
            id INTEGER PRIMARY KEY ,
            author_id INTEGER,
            like_value INTEGER DEFAULT 0,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            FOREIGN KEY (id) REFERENCES ObjectId (id) ON DELETE CASCADE,
            FOREIGN KEY (author_id) REFERENCES Users (id) ON DELETE CASCADE
            );`
        ).catch(console.log);

        //create likes
        database.run(
           `CREATE TABLE IF NOT EXISTS Likes(
            user_id INTEGER,
            object_id INTEGER,
            value INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
            FOREIGN KEY (object_id) REFERENCES ObjectId (id) ON DELETE CASCADE,
            PRIMARY KEY(user_id, object_id)
           );` 
        ).catch(console.log);
        
        //create Comments
        database.run(
            `CREATE TABLE IF NOT EXISTS Comments(
            id INTEGER PRIMARY KEY,
            author_id INTEGER ,
            object_id INTEGER,
            content TEXT NOT NULL,
            like_value INTEGER DEFAULT 0,
            FOREIGN KEY (id) REFERENCES ObjectId (id),
            FOREIGN KEY (author_id) REFERENCES Users (id) ON DELETE CASCADE,
            FOREIGN KEY (object_id) REFERENCES ObjectId (id) ON DELETE CASCADE
           );`
          )
          .catch(console.log);
        
        //create ObjectId
        database.run(
           `CREATE TABLE IF NOT EXISTS ObjectId(
            id INTEGER PRIMARY KEY AUTOINCREMENT
           );` 
        ).catch(console.log);
        
        //create Subscribers
        database.run(
           `CREATE TABLE IF NOT EXISTS Subscribers(
            src_user INTEGER,
            dst_user INTEGER,
            FOREIGN KEY (src_user) REFERENCES Users (id) ON DELETE CASCADE,
            FOREIGN KEY (dst_user) REFERENCES Users (id) ON DELETE CASCADE,
            PRIMARY KEY(src_user, dst_user)
           );` 
        ).catch(console.log);
    }
}

module.exports = Managers;

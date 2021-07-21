const CookieManager = require('./CookieManager');
const LoginManager = require('./LoginManager');

// file manages manager objects
class Managers
{
    constructor (database)
    {
        this.initDatabase(database);
        this.cookieManager = new CookieManager();
        this.loginManager = new LoginManager(database);
    }
    // method creates database's tables
    initDatabase(database)
    {
        database.run(
            `CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            points INTEGER DEFAULT 0
            );`
        ).catch(console.log);
    }
}

module.exports = Managers;

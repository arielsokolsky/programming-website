const CookieManager = require('./CookieManager');
const LoginManager = require('./LoginManager');

// file manages manager objects
class Managers
{
    constructor (database)
    {
        this.cookieManager = new CookieManager();
        this.loginManager = new LoginManager(database);
    }
}

module.exports = Managers;

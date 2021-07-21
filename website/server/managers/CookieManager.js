const config = require("../Config.json");
const Helper = require("../Helper")

//this class is responsible for managing the cookies
class CookieManager
{
    //create a dictionary <cookie - RequestHandler>
    constructor()
    {
        this.stateMap = {};
    }

    //check if cookie exists
    checkCookie(cookie)
    {
        return cookie in this.stateMap;
    }

    //return random cookie
    addCookie()
    {
        let cookie = Helper.genrateRandomString(config.COOKIE_LENGTH, config.COOKIE_CHARS);
        //add the cookie and reset the requrestHandler
        this.stateMap[cookie] = undefined;  //to do : set to new request handler
        return cookie;
    }

    //remove a cookie from the dictinary
    removeCookie(cookie)
    {
        delete this.stateMap[cookie];
        return;
    }

    //get a cookie and reset the requestHandler
    resetState(cookie)
    {
        this.stateMap[cookie] = undefined;  //to do : set to new request handler
        return;
    }

    getState(){}
    setState(){}
}

module.exports = CookieManager;
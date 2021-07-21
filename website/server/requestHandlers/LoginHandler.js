const {RequestHandler, RequestResponse } = require("./RequestHandler")

class LoginHandler extends RequestHandler
{
    requests = {
        "/login": this.login,
        "/signup": this.signup
    };

    async login({ name, password })
    {
        let loginManager = this.managers.loginManager;
        
        try
        {
            await loginManager.loginValid(name, password);
            //to do: change undefined to menuHandler
            return new RequestResponse({message : "ok", undefined});
        }
        catch (error)
        {
            return new RequestResponse({error : error.message });
        }
    }

    async signup({ name, password })
    {
        let loginManager = this.managers.loginManager;
        let userExists = await loginManager.userExists(name, password)
        let response = userExists ? {message : "ok"} : { error: "signup failed" };
        return new RequestResponse(response);
    }
}

module.exports.LoginHandler = LoginHandler;

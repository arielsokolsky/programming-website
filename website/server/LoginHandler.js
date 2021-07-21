const LoginManager = require('./managers/LoginManager');

class LoginHandler extends RequestHandler
{
    requests = {
        "/login": this.login,
        "/signup": this.signup
    };

    constructor(managers, cookie)
    {
        super(managers, cookie);
    };

    async login({ name, password })
    {
        let loginManager = this.managers.loginManager;
        
        try
        {
            await loginManager.loginValid(name, password);
            //to do: change undefined to menuHandler
            return new RequestResult({message : "ok", undefined});
        }
        catch (error)
        {
            return new RequestResult({error : error.message });
        }
    }

    async signup({ name, password })
    {
        let loginManager = this.managers.loginManager;
        let userExists = await loginManager.userExists(name, password)
        let response = userExists ? {message : "ok"} : { error: "signup failed" };
        return new RequestResult(response);
    }
}

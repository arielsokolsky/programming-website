const { RequestHandler, RequestResponse } = require("./RequestHandler");

class LoginHandler extends RequestHandler
{
    requests = {
        "/login": this.login.bind(this),
        "/signup": this.signup.bind(this)
    };

    async login({ name, password })
    {
        let loginManager = this.managers.loginManager;
        
        try
        {
            let userId = await loginManager.loginValid(name, password);
            return new RequestResponse({ ok: true, undefined }); //to do: change undefined to menuHandler
        }
        catch (error)
        {
            return new RequestResponse({ ok: false, error: error.message });
        }
    }

    async signup({ name, password })
    {
        let userExists = await this.managers.loginManager.userExists(name, password);
        let response = userExists ? { ok: false, error: "user already exists" } : { ok: true };
        if (response.ok)
            await this.managers.loginManager.addUser(name, password);
        return new RequestResponse(response);
    }
}

module.exports = LoginHandler;

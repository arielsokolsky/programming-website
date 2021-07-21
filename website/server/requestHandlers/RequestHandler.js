const Helper = require('../Helper');

class RequestHandler
{
    constructor (managers, cookie)
    {
        this.managers = managers;
        this.cookie = cookie;
    }
    // method handles a request from user and returns an response. an async method.
    async handleRequest(request, response)
    {
        let result = await this.getHandler(request)(request.body);
        // update state using cookie
        this.managers.cookieManager.setState(this.cookie, result.newHandler);
        // send respons
        response.send(result.responseJson);
    }
    // method returns the function which can handle user's request. returns an async method.
    getHandler(request)
    {
        return this.requests[Helper.path(request)];
    }
}

function RequestResponse(responseObject, newRequestHandler)
{
    this.respsoneJson = JSON.stringify(responseObject);
    this.newHandler = newRequestHandler;
}
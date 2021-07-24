const express = require('express');
const path = require('path');

const config = require('./Config.json');
const Database = require('./Database.js');
const Managers = require('./managers/Managers.js');
const Helper = require('./Helper.js');
const LoginHandler = require('./requestHandlers/LoginHandler.js');

const app = express();
const PORT = 8080;

// express middleware
app.use(express.json());
app.use(function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, mode, Accept");
    next();
});
app.use(express.static(path.join(__dirname, '../build')));

// main function
(function server()
{
	let database = new Database(config.DATABASE_FILE);
	let managers = new Managers(database);
/*
	// get app
	app.get('/', function (request, response) 
	{
		response.sendFile(path.join(__dirname, 'build', 'index.html'));
	});

	// create connection and handle cookies
	app.get('/connection', function(request, response)
	{
		let loggedIn = false;
		let cookie = Helper.getCookie(request);
		if(managers.cookieManager.checkCookie(cookie))
		{
			if (!(managers.cookieManager.getState(cookie) instanceof LoginHandler))
			{
				managers.cookieManager.resetState();
				loggedIn = true;
			}
		}
		else
		{
			cookie = managers.cookieManager.addCookie(managers);
			response.cookie("sessionKey", cookie);
		}
		response.send(JSON.stringify({ loggedIn: loggedIn }));
	});

	app.post('*', function (request, response)
	{
		let cookie = Helper.getCookie(request);
		if (cookie)
			managers.cookieManager.getState(cookie).handleRequest(request, response);
		else
			response.send(JSON.stringify({ ok: false, error: "unauthenticated (no cookie)" }));
	});

	app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));*/
})();

const express = require('express');
const path = require('path');

const config = require('./Config.json');
const Database = require('./Database.js');
const Managers = require('./managers/Managers.js');

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

	// get app
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});

	app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
})();

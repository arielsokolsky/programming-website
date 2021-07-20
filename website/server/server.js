const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, mode, Accept");
    next();
});
app.use(express.static(path.join(__dirname, '../build')));

(function server()
{
	// get app
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});

	app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
})();

import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login.js';
import Fetch from './Fetch.js';

const themePaths = ["colorPalettes/darkTheme.css", "colorPalettes/lightTheme.css"];

function App()
{
	const [colorPalette, setColorPalette] = useState(0);
	const history = useHistory();

	function changeColorPalette()
	{
		setColorPalette((colorPalette + 1) % themePaths.length);
	}

	useEffect(
		() =>
		{
			(async function ()
			{
				let data = await Fetch.get("http://localhost:8080/connection");
				if (data.loggedIn)
					history.push({ pathname: "/home" });
				else
					history.push({ pathname: "/login" });
			})();
		}
		, []
	);

	return (
		<div>
			<style>
				{/* import font Doppio One */}
				@import url('https://fonts.googleapis.com/css2?family=Doppio+One&display=swap');
			</style>
			<link href={themePaths[colorPalette]} rel="stylesheet" />

			<Switch>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/signup" component={Signup}/>
			</Switch>
		</div>
	);
}

export default App;
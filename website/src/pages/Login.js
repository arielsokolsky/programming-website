import './Login.css';
import InputField from '../components/InputField.js';
import { useState } from 'react';
import Fetch from '../Fetch.js';

const LOGIN_URL = "https://localhost:8080/login";

function Login()
{
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// function routes to signup page
	function signup()
	{
		// TODO: route to /signup
		console.log("/signup");
	}

	// function attempts to log into the website
	async function login()
	{
		let data = await Fetch.post(LOGIN_URL, { name: username, password: password });
		
		if (data.ok)
		{
			// TODO: route to /home
			console.log("/home");
		}
		else
		{
			if (data.error)
				setError(data.error);
			else
				setError("unknown error");
		}
	}

	return (
		<div className="loginDiv">
			<h1 className="loginTitle">LOGIN</h1>
			<InputField name="username" placeholder="Enter username..." labelOnTop={true}
				setValue={setUsername} labelClass="loginLabel" inputClass="loginInput" />
			<InputField name="password" placeholder="Enter password..." labelOnTop={true}
				setValue={setPassword} type="password" labelClass="loginLabel" inputClass="loginInput" />
			<h3 className="loginError">{error}</h3>
			
			<button className="loginButton" onClick={signup}>Signup</button>
			<button className="loginButton" onClick={login}>Login</button>
		</div>
	);
}

export default Login;

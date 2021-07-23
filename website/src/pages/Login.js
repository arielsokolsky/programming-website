import './Login.css';
import InputField from '../components/InputField.js';
import { useState } from 'react';
import Fetch from '../Fetch.js';
import { Link, useHistory } from 'react-router-dom';

const LOGIN_URL = "http://localhost:8080/login";

function Login()
{
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();

	// function attempts to log into the website
	async function login()
	{
		let data = await Fetch.post(LOGIN_URL, { name: username, password: password });

		if (data.ok)
		{
			history.push({ pathname: "/home" });
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
			
			<Link to="/signup">
				<button className="loginButton">Signup</button>
			</Link>
			<button className="loginButton" onClick={login}>Login</button>
		</div>
	);
}

export default Login;

import './Login.css';
import InputField from '../components/InputField.js';
import { useState } from 'react';
import Fetch from '../Fetch.js';

function Login()
{
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="loginDiv">
			<h1 className="loginTitle">LOGIN</h1>
			<InputField name="username" placeholder="Enter username..." labelOnTop={true}
				setValue={setUsername} labelClass="loginLabel" inputClass="loginInput" />
			<InputField name="password" placeholder="Enter password..." labelOnTop={true}
				setValue={setPassword} type="password" labelClass="loginLabel" inputClass="loginInput" />
			<button className="loginButton">Signup</button>
			<button className="loginButton">Login</button>
		</div>
	);
}

export default Login;

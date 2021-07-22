import './Signup.css';
import InputField from '../components/InputField';
import { useState } from 'react';
import Fetch from '../Fetch';
import { wait } from '@testing-library/react';
const SERVER_URL = "http://localhost:8080"

function Signup()
{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState("");
    const [error, setError] = useState("");
    
    async function signup()
    {
        let response = await Fetch().post(SERVER_URL + "/signup", { name, password });
        if (response.ok)
        {
            //to do: route to /login
        }
        else
        {
            setError(response.error ? response.error: "unknown error");
        }
    }

    function login()
    {
        //to do: route to /login
    }

    return (
        <div className="signupDiv">
            <h1 className = "signupTitle">Signup</h1>
            <InputField name="The name " placeholder="Enter name" setValue={setName} type="text" labelOnTop={true} labelClass = "signupLabel" inputClass ="signupInput"/>
            <InputField name="Password " placeholder="Enter password" setValue={setPassword} type="password" labelOnTop={true} labelClass = "signupLabel" inputClass ="signupInput"/>
            <InputField name="Password " placeholder="Enter password" setValue={setValidate} type="password" labelOnTop={true} labelClass = "signupLabel" inputClass ="signupInput"/>
            <h1 className="signupError">{(password == validate || validate == "") ? "" : "your password is invalid. please try again"}</h1>
            <h1 className="signupError">{error}</h1>
            <button onClick={signup} className="signupButton">Signup</button>
            <br />
            <button onClick={login} className = "signupButton">Login</button>
        </div>

    );



}

export default Signup;

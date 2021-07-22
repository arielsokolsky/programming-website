import './Signup.css';
import InputField from '../components/InputField';
import { useState } from 'react';


function Signup()
{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("")
    const [validate, setValidate] = useState("")

    return (
        <div className="signupDiv">
            <h1 className = "signupTitle">Signup</h1>
            <InputField name="The name " placeholder="Enter name" setValue={setName} type="text" labelOnTop={true} labelClass = "signupLabel" inputClass ="signupInput"/>
            <InputField name="Password " placeholder="Enter password" setValue={setPassword} type="password" labelOnTop={true} labelClass = "signupLabel" inputClass ="signupInput"/>
            <InputField name="Password " placeholder="Enter password" setValue={setValidate} type="password" labelOnTop={true} labelClass = "signupLabel" inputClass ="signupInput"/>
            <h1 className = "signupError">{(password == validate || validate=="") ? "" : "your password is invalid. please try again"}</h1>
            <button onClick={signup} className="signupButton">Signup</button>
            <br />
            <button onClick={login} className = "signupButton">Login</button>
        </div>

    );
}

function signup()
{
   //to do: route to sign up
}

function login()
{
    //to do: route to menu
}


export default Signup;

import  React, { useState } from "react";
import './InputField.css';

//component for input and label
const InputField = props =>
{
    const { name = "", placeholder = "", setValue = () => { }, type = "type", labelOnTop = "false" } = props;
    const [text, setText] = useState("");

    //saves input and passes it to parent
    function inputHandler(e)
    {
        setText(e.target.value);
        setValue(e.target.value);
    }
   
    return (
        <div>
            <label>{name}</label>

            {labelOnTop ? <br /> : ""}
            <input
                className={labelOnTop ? "inputFieldTop" : "inputField"}
                type={type}
                value={text}
                placeholder={placeholder}
                onInput={inputHandler}
            />
        </div>
    )
}

export default InputField;

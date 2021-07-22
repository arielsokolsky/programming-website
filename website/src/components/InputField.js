import  React, { useState } from "react";
import './InputField.css';

// component for input and label
function InputField(props)
{
    const { name = "", placeholder = "", setValue = () => { }, type = "text", labelOnTop = false, labelClass = "", inputClass = "" } = props;
    const [text, setText] = useState("");

    // saves input and passes it to parent
    function inputHandler(e)
    {
        setText(e.target.value);
        setValue(e.target.value);
    }

    return (
        <div>
            <label className={labelClass}>{name}</label>

            {labelOnTop ? <br /> : ""}
            <input
                className={(labelOnTop ? "inputFieldTop " : "inputField ") + inputClass}
                type={type}
                value={text}
                placeholder={placeholder}
                onInput={inputHandler}
            />
        </div>
    );
}

export default InputField;

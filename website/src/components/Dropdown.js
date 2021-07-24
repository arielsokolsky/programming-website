import  React, { useState } from "react";
import './Dropdown.css';

// component for Dropdown menu (html select - options)
function Dropdown(props)
{
    let { name = "", values = [], setValue = () => { }, labelOnTop = false, selectClass = "", labelClass = "" } = props;
    const [choice, setChoice] = useState("");

    // function updates choice to select's value
    function valueChange(e)
    {
        setChoice(e.target.value);
        setValue(e.target.value);
    }

    return (
        <div>
            <label className={"dropdownLabel " + labelClass}>{name}</label>

            {labelOnTop ? <br /> : ""}
            <select value={choice} onChange={valueChange} className={"dropdown " + selectClass}>
                {values.map(value =>
                    <option value={value}>{value}</option>
                )}
            </select>
        </div>
    );
}

export default Dropdown;

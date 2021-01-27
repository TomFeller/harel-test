import React, {useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./field.scss";

export const Field = (
    {type = "text", label, name, value="", onChange, placeholder, errorMessage, warningsActive}
) => {
    const [inputValue, setInputValue] = useState(value);

    const handleBlur = () => {
        onChange(name, inputValue)
    };
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const error = warningsActive &&
        (!inputValue || (type === "email" && !emailRegex.test(String(inputValue).toLowerCase())));


    return (
        <div className={classNames("field", {error})}>
            <div className="field-control">
                {label && <label>{label}</label>}
                <input type={type}
                       defaultValue={inputValue}
                       name={name}
                       onChange={(e) => setInputValue(e.target.value)}
                       onBlur={handleBlur}
                       placeholder={placeholder}
                       className="field-input"/>
                {errorMessage && <div className="field-warning">{errorMessage}</div>}
            </div>
        </div>
    )
};


Field.defaultProps = {
    type: "text",
    valid: true
};
Field.propTypes = {
    type: PropTypes.oneOf(["text", "number", "email", "password"]),
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    valid: PropTypes.bool
};
import React, {useState,useReducer} from "react";
import {Field} from "../../ui/field/field";
import {API} from "../../../store/actions/users-actions";

const initialFormData = {
    mail: "",
    firstName: "",
    lastName: "",
    password: ""
};

const loginForm = [
    {name: "mail", placeholder: "מייל", errorMessage:"כתובת מייל לא תקינה", type:"email"},
    {name: "firstName", placeholder: "שם פרטי", errorMessage:"יש להזין שם פרטי"},
    {name: "lastName", placeholder: "שם משפחה", errorMessage:"יש להזין שם משפחה"},
    {name: "password", placeholder: "סיסמא", errorMessage:"יש להזין סיסמא", type:"password"},
];

export const PageLogin = () => {
    const formReducer = (state, action) => {
        return {...state, [action.name]: action.value};
    };

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useReducer(formReducer, initialFormData);
    const [warningsActive, setWarningsActive] = useState(false);

    const handleFieldChange = (name, value) => setFormData({name: name, value: value});

    const renderField = (field, index) => {
        return <Field {...field}
                      key={index}
                      warningsActive={warningsActive}
                      onChange={handleFieldChange}/>
    };

    const checkValidations = () => {
        const {firstName, lastName, password, mail} = formData;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailValid = emailRegex.test(String(mail).toLowerCase());
        return !!(firstName && lastName && password && emailValid);
    };

    const handleSubmit = () => {
        if (checkValidations()) {
            setIsLoading(true);
            setWarningsActive(false);
            fetch(`${API}/login`, {
                method: "POST",
                body: formData
            }).then(
                response => {
                    setIsLoading(false);
                    if (response.ok) {
                        localStorage.setItem("userDetails", JSON.stringify(formData));
                        handleLoginSuccess();
                    } else {
                        alert("Error")
                    }
                }
            )
        } else {
            setWarningsActive(true)
        }
    };

    const handleLoginSuccess = () => {
        window.location.href = "/";
    };

    return (
        <div>
            <h3>התחבר</h3>
            {loginForm.map(renderField)}
            <button onClick={handleSubmit}>{isLoading ? "..." : "המשך"}</button>
        </div>
    )
};
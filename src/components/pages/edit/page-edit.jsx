import React, {useState, useEffect, useReducer} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Field} from "../../ui/field/field";
import {Link} from "react-router-dom";
import * as usersActions from "../../../store/actions/users-actions";

import "./page-edit.scss";

export const PageEdit = () => {
    const {id} = useParams();
    const user = useSelector(state => state.users.singleUser);
    const [isLoading, setIsLoading] = useState(!user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(usersActions.getSingleUser(id)).then(() => setIsLoading(false));
    }, []);

    const formReducer = (state, action) => {
        if (action.type === "edit") {
            setStatus("");
            return {...state, [action.name]: action.value};
        }
        return action.user;
    };

    const [status, setStatus] = useState("");
    const [warningsActive, setWarningsActive] = useState(false);
    const [userFields, setUserFields] = useReducer(formReducer, user);

    const handleFieldChange = (name, value) => {
        setUserFields({type: "edit", name: name, value: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(true);
        dispatch(usersActions.updateUser(userFields));
        setStatus("saved");
    };

    const renderField = (field, index) => {
        return <Field {...field}
                      key={index}
                      warningsActive={warningsActive}
                      onChange={handleFieldChange}/>
    };
    if (isLoading || !user) {
        return "LOAIDNG"
    }

    const form = [
        {
            value: user.firstName,
            name: "firstName",
            label: "שם פרטי",
            placeholder: "שם פרטי",
        }, {
            value: user.lastName,
            name: "lastName",
            label: "שם משפחה",
            placeholder: "שם משפחה",
        },  {
            value: user.email,
            name: "email",
            label: "כתובת מייל",
            placeholder: "כתובת מייל",
        },
        {
            value: user.phone,
            name: "phone",
            label: "טלפון",
            placeholder: "טלפון",
        },
        {
            value: user.accountName,
            name: "accountName",
            placeholder: "שם חשבון",
            label: "שם חשבון",
        }, {
            value: user.account,
            name: "account",
            placeholder: "חשבון בנק",
            label: "חשבון בנק",
            type: "password"
        },
    ];
    return (
        <div id="page-edit">
            <form className="page-edit-form">
                <label>פרטים:</label>
                {form.map(renderField)}
                <div className={"page-edit-form-buttons"}>
                    <div className={"page-edit-form-button"}>
                        <button onClick={handleSubmit}>
                            {status ? status === "saved" ? "נשמר" : "..." : "שמור"}
                        </button>
                    </div>
                    <div className={"page-edit-form-button"}>
                        <Link to={"/"}>
                            <button>
                                חזור
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
};
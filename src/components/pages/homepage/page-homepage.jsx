import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UsersTable} from "../../users/users-table";
import * as usersActions from "../../../store/actions/users-actions";

export const PageHomepage = () => {
    const userDetails = localStorage.getItem("userDetails");
    const users = useSelector(state => state.users.allUsers);

    const [filterValue, setFilterValue] = useState("");
    const [isLoading, setIsLoading] = useState(!users || users.length === 0);

    const dispatch = useDispatch();

    if (!userDetails || !JSON.parse(userDetails).mail) {
        window.location.href = "/login"
    }

    useEffect(() => {
        if (!users || users.length === 0) {
            dispatch(usersActions.getAllUsers()).then(
                res => setIsLoading(false)
            );
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    const filterUsers = (e) => {
        setFilterValue(e.target.value);
    };

    if (isLoading) {
        return <div>LOADING</div>
    }
    return (
        <div id={"homepage"}>
            <div className={"homepage-container"}>
                <div className="users-filter">
                    <button onClick={logout} className={"logout"}>התנתק</button>
                    <input placeholder={"פלטר"} onChange={filterUsers}/>
                </div>
                <UsersTable filterValue={filterValue?.toLowerCase()}/>
            </div>
        </div>
    )
};
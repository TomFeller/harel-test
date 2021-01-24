import {User} from "../models/user-model";

export const SET_USERS = "SET_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const API = "https://test-api-server.herokuapp.com";

export const getAllUsers = () => {
    return async (dispatch) => {
        await fetch(`${API}/users`).then(
            response => response.ok && response.json()
        ).then(
            response => {
                let users = [];
                for (const key in response) {
                    const u = response[key];
                    users.push(new User(u.id, u.firstName, u.lastName, u.date, u.phone));
                }
                dispatch({
                    type: SET_USERS,
                    allUsers: users
                })
            }
        )
    }
};

export const updateUser = (user) => {
    return async (dispatch) => {
        await fetch(
            `${API}/users/${user.id}`,
            {method: "POST", body: user}
        ).then(
            response => {
                dispatch({
                    type: UPDATE_USER,
                    user: new User(user.id, user.firstName, user.lastName, user.date, user.phone)
                })
            }
        )
    }
};
import {SET_USERS, UPDATE_USER} from "../actions/users-actions";

const initialState = {
    allUsers: []
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                allUsers: action.allUsers
            };

        case UPDATE_USER:
            const update = user => user.id === parseInt(action.user.id) ? action.user : user;
            const updatedUsers = state.allUsers.map(update);
             return {
                allUsers: updatedUsers
            };

        default:
            return state
    }
};
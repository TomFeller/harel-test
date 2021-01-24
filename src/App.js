import React from 'react';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'

import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {PageHomepage, PageLogin, PageEdit} from "./components/pages/pages";
import {usersReducer} from "./store/reducers/users-reducer";
import { createStore, combineReducers, applyMiddleware } from 'redux';


const rootReducer = combineReducers({
    users: usersReducer
});

const persistedState = JSON.parse(localStorage.getItem('reduxState'))
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {};
const store = createStore(rootReducer, persistedState, applyMiddleware(ReduxThunk));

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});
function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/edit/:id">
                            <PageEdit/>
                        </Route>
                        <Route path="/login">
                            <PageLogin/>
                        </Route>
                        <Route path="/">
                            <PageHomepage/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;

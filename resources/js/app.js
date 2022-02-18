import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
<<<<<<< Updated upstream
=======
import { CookiesProvider } from "react-cookie";
>>>>>>> Stashed changes

import Main from "./components/Main";
import reducers from "./reducers";

ReactDOM.render(
<<<<<<< Updated upstream
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <Router>
            <Main />
        </Router>
    </Provider>,
=======
    <CookiesProvider>
        <Provider store={createStore(reducers, applyMiddleware(thunk))}>
            <Router>
                <Main />
            </Router>
        </Provider>
    </CookiesProvider>,

>>>>>>> Stashed changes
    document.querySelector("#root")
);

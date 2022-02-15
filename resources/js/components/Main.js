import React from "react";
import { Routes, Route } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./contents/Dashboard";

function Main() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<SignIn />}></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
        </div>
    );
}

export default Main;

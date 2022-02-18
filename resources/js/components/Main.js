import React from "react";
import { Routes, Route } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MainContent from "./layouts/MainContent";

const Main = () => {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<SignIn />}></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/*" element={<MainContent />}></Route>
            </Routes>
        </div>
    );
}

export default Main;

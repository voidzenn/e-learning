import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MainContent from "./layouts/MainContent";

const Main = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = props.cookies.get("userAuth");

    /*
            Check first if userAuth data is not empty then store data in cookie for userAuth, so 
            that the values can be retrieved on site refresh
        */
    if (props.userAuth.length !== 0) {
      props.cookies.set("userAuth", props.userAuth, { path: "/" });
    }

    if (userAuth !== undefined) {
      // If admin, navigate to categories instead
      if (userAuth.is_admin === 1) {
        navigate("/categories");
      } else {
        navigate("/dashboard");
      }
    }
  }, [props.userAuth]);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/*" element={<MainContent />}></Route>
      </Routes>
    </div>
  );
};

const mapToStateProps = (state, ownProps) => {
  return {
    userAuth: state.auth.userAuth,
    cookies: ownProps.cookies,
  };
};

export default withCookies(connect(mapToStateProps)(Main));

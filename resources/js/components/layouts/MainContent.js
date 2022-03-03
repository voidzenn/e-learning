import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import { Box, Container } from "@mui/material";

import { BASE_URL } from "../../config";
import Header from "./Header";
import Dashboard from "../contents/Dashboard";
import Category from "../contents/Category";
import CategoryAdmin from "../contents/admin/CategoryAdmin";
import UserList from "../contents/UserList";
import {
  signOut,
  setUserAuthDetails,
  freshState,
} from "../../actions/auth";

const MainContent = (props) => {
  //  Retrieve data from storage
  const userAuth = props.cookies.get("userAuth");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set the userAuth with the cookies values
      props.setUserAuthDetails(userAuth);
      // Re-intialize the state of sign in page
      props.freshState();
    }
  }, []);

  useEffect(() => {
    if (userAuth === undefined) {
      window.location.replace(BASE_URL);
    }
  }, [props.userAuth]);

  const handleSignOut = () => {
    // When sign out, we should pass the current user auth id
    props.signOut(props.userAuth.id);
    // Remove the userAuth ( userAuth is the user authenticated details ) data
    props.cookies.remove("userAuth");
    /*
      Remove the wordContent data ( wordContent is when the user clicks on the add word 
      in the categories, the word component will be opened. )
    */
    props.cookies.remove("wordContent");
    // Remove the activePage data
    props.cookies.remove("activePage");
  };

  return (
    <React.Fragment>
      {props.userAuth.length !== 0 ? (
        <React.Fragment>
          <Header handleSignOut={handleSignOut} />

          <main>
            <Box sx={{ bgcolor: "Background.paper", pt: 8, pb: 6 }}>
              <Container maxWidth="lg">
                <Routes>
                  {props.userAuth.is_admin === 0 ? (
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                  ) : null}
                  <Route
                    path="/categories/*"
                    element={
                      props.userAuth.is_admin === 1 ? (
                        <CategoryAdmin />
                      ) : (
                        <Category />
                      )
                    }
                  ></Route>
                  <Route path="/user_lists" element={<UserList />}></Route>
                </Routes>
              </Container>
            </Box>
          </main>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const mapToStateProps = (state, ownProps) => {
  return {
    userAuth: state.auth.userAuth,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapToStateProps, { signOut, setUserAuthDetails, freshState })(
    MainContent
  )
);

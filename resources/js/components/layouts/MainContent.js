import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import { Box, Container } from "@mui/material";

import Header from "./Header";
import Dashboard from "../contents/Dashboard";
import Category from "../contents/Category";
import CategoryAdmin from "../contents/admin/CategoryAdmin";
import Word from "../contents/Word";
import UserList from "../contents/UserList";
import { setUserAuthDetails } from "../../actions/userAuthActions";

const MainContent = (props) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            //  Retrieve data from storage
            const { cookies } = props;

            const userAuth = cookies.get("userAuth");

            // Set the userAuth with the cookies values
            props.setUserAuthDetails(userAuth);
        }
    }, []);

    return (
        <div>
            <Header></Header>

            <main>
                <Box sx={{ bgcolor: "Background.paper", pt: 8, pb: 6 }}>
                    <Container maxWidth="lg">
                        <Routes>
                            {props.userAuth.is_admin === "0" ? (
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                ></Route>
                            ) : null}
                            <Route
                                path="/categories"
                                element={
                                    props.userAuth.is_admin === "1" ? (
                                        <CategoryAdmin />
                                    ) : (
                                        <Category />
                                    )
                                }
                            ></Route>
                            <Route path="/words" element={<Word />}></Route>
                            <Route
                                path="/users"
                                element={<UserList />}
                            ></Route>
                        </Routes>
                    </Container>
                </Box>
            </main>
        </div>
    );
};

const mapToStateProps = (state, ownProps) => {
    return {
        userAuth: state.auth.userAuth,
        cookies: ownProps.cookies,
    };
};

export default withCookies(
    connect(mapToStateProps, { setUserAuthDetails })(MainContent)
);

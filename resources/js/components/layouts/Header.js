import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import {
    AppBar,
    Avatar,
    Box,
    Grid,
    Link,
    IconButton,
    Toolbar,
    Tooltip,
} from "@mui/material";

const Header = (props) => {
    const navigate = useNavigate();
    const [URI, setURI] = useState("");
    
    useEffect(() => {
        // This is to make the link styled as active
        setURI(window.location.pathname);
    }, []);

    const navigateToHome = (e) => {
        e.preventDefault();
        /*
            Admin has no dashboard that is why we need to check if admin.
            If admin then navigate to category otherwise dashboard.
        */
        if (props.userAuth.is_admin === "0") {
            navigate("/dashboard");
        } else {
            navigate("/categories");
        }
        
        setURI(window.location.pathname);
    };

    const navigateToCategory = (e) => {
        e.preventDefault();

        navigate("/categories");

        setURI(window.location.pathname);
    };

    const navigateToWord = (e) => {
        e.preventDefault();

        navigate("/words");

        setURI(window.location.pathname);
    };

    const navigateToUserList = (e) => {
        e.preventDefault();

        navigate("/users");

        setURI(window.location.pathname);
    };

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Grid justify="space-between" container spacing={12}>
                        <Grid item xs={1}>
                            <Link href="" onClick={navigateToHome}>
                                <Avatar
                                    sx={{
                                        width: "100px",
                                        height: "100px",
                                        mt: 0,
                                        mb: -3,
                                        ml: 1,
                                    }}
                                    src="images/e-learning.png"
                                ></Avatar>
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid item xs={10} alignContent="flex-end">
                        <nav
                            style={{ textAlign: "right", marginRight: "30px" }}
                        >
                            <Link
                                variant="button"
                                href=""
                                onClick={(e) => {
                                    navigateToCategory(e);
                                }}
                                sx={{
                                    my: 1,
                                    mx: 1.5,
                                    textDecoration: "none",
                                    color: URI === "/categories" ? "#00587B" : "white",
                                    fontWeight: URI === "/categories" ? "600" : "",
                                }}
                            >
                                Categories
                            </Link>
                            <Link
                                variant="button"
                                href=""
                                onClick={(e) => {
                                    navigateToWord(e);
                                }}
                                sx={{
                                    my: 1,
                                    mx: 1.5,
                                    textDecoration: "none",
                                    color: URI === "/words" ? "#00587B" : "white",
                                    fontWeight: URI === "/words" ? "600" : "",
                                }}
                            >
                                Words
                            </Link>
                            <Link
                                variant="button"
                                href=""
                                onClick={(e) => {
                                    navigateToUserList(e);
                                }}
                                sx={{
                                    my: 1,
                                    mx: 1.5,
                                    textDecoration: "none",
                                    color: URI === "/users" ? "#00587B" : "white",
                                    fontWeight: URI === "/users" ? "600" : "",
                                }}
                            >
                                Users
                            </Link>
                        </nav>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userAuth: state.auth.userAuth,
    };
};

export default connect(mapStateToProps)(Header);

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import {
  AppBar,
  Avatar,
  Box,
  Grid,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { setUri } from "../../actions/header";

const Header = (props) => {
  const navigate = useNavigate();
  // Menu dropdown settings
  const menuSettings = () => {
    return props.userAuth
      ? [
          // Add the name as first index value
          props.userAuth.fname + " " + props.userAuth.lname,
          "Sign Out",
        ]
      : ["Sign Out"];
  };
  // Style for active link buttons
  const activeBtnStyle = {
    color: "white",
    fontWeight: "900",
    fontSize: "15px",
  };
  // Style for inactive link buttons
  const inActiveBtnStyle = {
    color: "white",
  };

  useEffect(() => {
    // This is to make the link styled as active on first load
    // Get the cookie activePage value
    const uriName = props.cookies.get("activePage");
    if (uriName !== undefined) {
      switch (uriName) {
        case "/dashboard":
          props.setUri(uriName);
          break;
        case "/categories":
          props.setUri(uriName);
          break;
        case "/user_lists":
          props.setUri(uriName);
          break;
        case "/profile":
          props.setUri(uriName);
          break;
      }
    } else {
      // Go to home if uriName is unrecognized
      if (props.userAuth.is_admin === 0) {
        props.setUri("/dashboard");
        // Set active page on first load
        props.cookies.set("activePage", "/dashboard", {
          path: "/",
        });
      } else {
        props.setUri("/categories");
        // Set active page on first load
        props.cookies.set("activePage", "/categories", {
          path: "/",
        });
      }
    }
  }, []);

  useEffect(() => {
    // Navigate based on the updated URI
    if (props.uri !== "") {
      navigate(props.uri);
    }
  }, [props.uri]);

  const navigateToHome = (e) => {
    e.preventDefault();
    /*
      Admin has no dashboard that is why we need to check if admin.
      If admin then navigate to category otherwise dashboard.
    */
    if (props.userAuth.is_admin === 0) {
      navigate("/dashboard");
      props.setUri("/dashboard");
    } else {
      navigate("/categories");
      props.setUri("/categories");
    }
    // Set the activePage to stay on current page when the page reloads
    props.cookies.set("activePage", window.location.pathname, { path: "/" });
  };

  const navigateToDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard");
    // Set the activePage to stay on current page when the page reloads
    props.cookies.set("activePage", window.location.pathname, { path: "/" });
    props.setUri("/dashboard");
  };

  const navigateToCategory = (e) => {
    e.preventDefault();
    navigate("/categories");
    // Set the activePage to stay on current page when the page reloads
    props.cookies.set("activePage", window.location.pathname, { path: "/" });
    props.setUri("/categories");
  };

  const navigateToUserList = (e) => {
    e.preventDefault();
    navigate("/user_lists");
    // Set the activePage to stay on current page when the page reloads
    props.cookies.set("activePage", window.location.pathname, { path: "/" });
    props.setUri("/user_lists");
  };

  const navigateToProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
    // Set the activePage to stay on current page when the page reloads
    props.cookies.set("activePage", window.location.pathname, { path: "/" });
    // We need to delete the cookie first then add again
    props.cookies.remove("profileData");
    // Add profile data to cookie
    props.cookies.set(
      "profileData",
      { userId: props.userAuth.id },
      { path: "/" }
    );
    props.setUri("/profile");
  };

  const [anchorUser, setAnchorUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUser(null);
  };

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Grid justify="space-between" container spacing={12}>
            <Grid item lg={4} xs={2}>
              <Link href="" onClick={navigateToHome}>
                <Avatar
                  sx={{
                    width: "150px",
                    height: "150px",
                    mt: -5,
                    mb: -5,
                    ml: 1,
                    p: 0,
                  }}
                  src="images/e-learning-2.png"
                ></Avatar>
              </Link>
            </Grid>
          </Grid>

          <Grid item xs={10} alignContent="flex-end">
            <nav style={{ textAlign: "right", marginRight: "30px" }}>
              {props.userAuth.is_admin === 0 ? (
                <Link
                  variant="button"
                  href=""
                  onClick={(e) => {
                    navigateToDashboard(e);
                  }}
                  sx={{
                    my: 1,
                    mx: 1.5,
                    textDecoration: "none",
                    /*
                  When you want to put some conditioning in MUI styles and you want
                  to pass style objects, you will need to you use this format.
                */
                    ...(props.uri === "/dashboard"
                      ? activeBtnStyle
                      : inActiveBtnStyle),
                  }}
                >
                  Dashboard
                </Link>
              ) : null}
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
                  /*
                    When you want to put some conditioning in MUI styles and you want
                    to pass style objects, you will need to you use this format.
                  */
                  ...(props.uri === "/categories"
                    ? activeBtnStyle
                    : inActiveBtnStyle),
                }}
              >
                Categories
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
                  ...(props.uri === "/user_lists"
                    ? activeBtnStyle
                    : inActiveBtnStyle),
                }}
              >
                Userlists
              </Link>
            </nav>
          </Grid>
          <Grid item xs={1}>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Admin" src="" />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorUser)}
                onClose={handleCloseUserMenu}
              >
                {menuSettings().length !== 0
                  ? menuSettings().map((setting, index) => {
                      // Apply to name
                      return index === 0 ? (
                        <Tooltip
                          title="Go to Your Profile Page"
                          placement="left"
                          key={index}
                        >
                          <MenuItem
                            key={setting}
                            onClick={(e) => {
                              handleCloseUserMenu();
                              navigateToProfile(e);
                            }}
                          >
                            <Typography
                              textAlign="center"
                              sx={{ fontWeight: "900" }}
                            >
                              {setting}
                            </Typography>
                          </MenuItem>
                        </Tooltip>
                      ) : (
                        <MenuItem
                          key={setting}
                          onClick={() => {
                            handleCloseUserMenu();
                            props.handleSignOut();
                          }}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );
                    })
                  : null}
              </Menu>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    // Handles the navigation state
    uri: state.header.uri,
    userAuth: state.auth.userAuth,
    handleSignOut: ownProps.handleSignOut,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapStateToProps, {
    setUri,
  })(Header)
);

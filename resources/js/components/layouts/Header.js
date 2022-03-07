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

const Header = (props) => {
  const navigate = useNavigate();
  const [URI, setURI] = useState("");
  // Menu dropdown settings
  const menuSettings = ["Profile", "Dashboard", "Sign Out"];
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
          setURI(uriName);
        case "/categories":
          setURI(uriName);
        case "/user_lists":
          setURI(uriName);
      }
    } else {
      // Go to home if uriName is unrecognized
      if (props.userAuth.is_admin === 0) {
        setURI("/dashboard");
        // Set active page on first load
        props.cookies.set("activePage", "/dashboard", {
          path: "/",
        });
      } else {
        setURI("/categories");
        // Set active page on first load
        props.cookies.set("activePage", "/categories", {
          path: "/",
        });
      }
    }
  }, []);

  useEffect(() => {
    // Navigate based on the updated URI
    if (URI !== "") {
      navigate(URI);
    }
  }, [URI]);

  const navigateToHome = (e) => {
    e.preventDefault();
    /*
      Admin has no dashboard that is why we need to check if admin.
      If admin then navigate to category otherwise dashboard.
    */
    if (props.userAuth.is_admin === 0) {
      navigate("/dashboard");
      setURI("/dashboard");
    } else {
      navigate("/categories");
      setURI("/categories");
    }
    // Set the activePage to stay on current page when the page reloads
    props.cookies.set("activePage", window.location.pathname, { path: "/" });
  };

  const navigateToCategory = (e) => {
    e.preventDefault();
    navigate("/categories");
    // Set the activePage to stay on current page when the page reloads
    props.cookies.set("activePage", window.location.pathname, { path: "/" });
    setURI("/categories");
  };

  const navigateToUserList = (e) => {
    e.preventDefault();
    navigate("/user_lists");
    // Set the activePage to stay on current page when the page reloads
    props.cookies.set("activePage", window.location.pathname, { path: "/" });
    setURI("/user_lists");
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
                  ...(URI === "/categories"
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
                  ...(URI === "/user_lists"
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
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Admin" src="" />
                </IconButton>
              </Tooltip>
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
                {menuSettings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu}
                    onClick={
                      setting === "Sign Out" ? props.handleSignOut : null
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
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
    userAuth: state.auth.userAuth,
    handleSignOut: ownProps.handleSignOut,
    cookies: ownProps.cookies,
  };
};

export default withCookies(connect(mapStateToProps)(Header));

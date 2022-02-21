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
    color: "#00587B",
    fontWeight: "600",
  };
  // Style for inactive link buttons
  const inActiveBtnStyle = {
    color: "white",
  };

  useEffect(() => {
    // This is to make the link styled as active on first load
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
                  navigateToWord(e);
                }}
                sx={{
                  my: 1,
                  mx: 1.5,
                  textDecoration: "none",
                  ...(URI === "/words" ? activeBtnStyle : inActiveBtnStyle),
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
                  ...(URI === "/users" ? activeBtnStyle : inActiveBtnStyle),
                }}
              >
                Users
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
  };
};

export default connect(mapStateToProps)(Header);

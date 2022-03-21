import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import {
  Container,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { fetchUsers, changeRole, freshUser } from "../../actions/user";
import AlertContent from "../contents/subcontents/AlertContent";
import Pagination from "../contents/subcontents/Pagination";

const UserList = (props) => {
  useEffect(() => {
    // Remove the cookie current page to go back to first page
    props.cookies.remove("currentPage");
    props.fetchUsers(props.token);
  }, []);

  useEffect(() => {
    /* 
      This will run if there is a request or when a request has 
      a message response. After a request it will re-render the 
      users.
    */
    if (props.requestErrorMessage !== "") {
      const currentValue = props.cookies.get("currentPage");
      /*
        Check in the cookies if currentPage is not empty
        then pass it in the fetching of users.
      */
      if (currentValue !== "") {
        props.fetchUsers(props.token, currentValue);
      } else {
        props.fetchUsers(props.token, 1);
      }
    }
  }, [props.requestErrorMessage]);

  const tableCellStyles = {
    fontSize: "18px",
  };

  const onChangeRole = (data) => {
    props.changeRole(props.token, data);
    // Re-initialize the state
    props.freshUser();
  };

  const handleOnPageChange = (e, value) => {
    e.preventDefault();
    /* 
      We should add 1 to value because the TablePagination next page
      , when clicked will return 1 instead of 2, for the pagination 
      request to laravel controller to properly work.
    */
    value += 1;
    /* 
      We need to assign a value inside a cookie to retrieve the current
      page value , so the user list table would not go to the first page
      if editing or deleting a row.
    */
    props.cookies.set("currentPage", value, { path: "/" });
    props.fetchUsers(props.token, value);
  };

  // Get paginate from data and assign to variable
  const itemKey = {
    from: props.userData.length !== 0 ? props.userData.from : 1,
  };

  return (
    <React.Fragment>
      <Container>
        <Grid container>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Typography component="h5" variant="h5" sx={{ mb: 5 }}>
              Userlists
            </Typography>
          </Grid>
          <Grid item lg={8} md={8} sm={8} xs={12}>
            {props.requestErrorMessage !== "" ? (
              <AlertContent
                isError={props.requestError}
                message={props.requestErrorMessage}
              />
            ) : null}
          </Grid>
        </Grid>
      </Container>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 1200 }}>
          <Table stickyHeader aria-label="sticky table" sx={{ p: 5 }}>
            <TableHead style={{ backgroundColor: "orange" }}>
              <TableRow>
                <TableCell sx={tableCellStyles}>#</TableCell>
                <TableCell sx={tableCellStyles}>Name</TableCell>
                <TableCell sx={tableCellStyles}>Email</TableCell>
                <TableCell sx={tableCellStyles}>Avatar</TableCell>
                <TableCell sx={tableCellStyles}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.userData.length !== 0
                ? Object.entries(props.userData.data).map(([key, user]) => {
                    var finalKey = {};
                    // Make iteration to the itemKey value
                    finalKey = { ...itemKey, from: itemKey.from++ };
                    return (
                      <TableRow key={key}>
                        <TableCell>{props.userData.from++}</TableCell>
                        <TableCell>
                          <span style={{ textTransform: "capitalize" }}>
                            {user.fname}
                          </span>{" "}
                          <span style={{ textTransform: "capitalize" }}>
                            {user.lname}
                          </span>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.avatar}</TableCell>
                        <TableCell>
                          <Select
                            fullWidth
                            sx={{ maxWidth: "150px" }}
                            size="small"
                            value={user.is_admin === 0 ? 0 : 1}
                            onChange={() => {
                              onChangeRole({
                                userId: user.id,
                                key: key,
                                isAdmin: user.is_admin,
                              });
                            }}
                          >
                            <MenuItem
                              value={1}
                              selected={user.is_admin === 1 ? true : false}
                              disabled={user.is_admin === 1 ? true : false}
                            >
                              Admin
                            </MenuItem>
                            <MenuItem
                              value={0}
                              selected={user.is_admin === 0 ? true : false}
                              disabled={user.is_admin === 0 ? true : false}
                            >
                              User
                            </MenuItem>
                          </Select>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
          {props.userData.length !== 0 ? (
            <Pagination
              total={props.userData.total}
              page={props.userData.current_page}
              rowsPerPage={props.userData.per_page}
              handleOnPageChange={handleOnPageChange}
            />
          ) : null}
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
};

const mapToStateProps = (state, ownProps) => {
  return {
    token: state.auth.userAuth.token,
    userData: state.user.userData,
    requestError: state.user.requestError,
    requestErrorMessage: state.user.requestErrorMessage,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapToStateProps, { fetchUsers, changeRole, freshUser })(UserList)
);

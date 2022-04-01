import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Button, Grid, TextField } from "@mui/material";

import {
  validateCurrentPass,
  validatePassword,
  validateConfirmPass,
  updatePassword,
} from "../../actions/profile";

const EditPassword = (props) => {
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // Run on form error changes
  useEffect(() => {
    // Check if validation no error
    if (
      props.isValidCurrentPass &&
      props.isValidPassword &&
      props.isValidConfirmPass &&
      props.currentPass !== "" &&
      props.password !== "" &&
      props.confirmPass !== ""
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    props.isValidCurrentPass,
    props.isValidPassword,
    props.isValidConfirmPass,
    props.currentPass,
    props.password,
    props.confirmPass,
  ]);

  // Handle update user password
  const handleUpdate = () => {
    // Update action
    props.updatePassword(props.userAuth.token, props.userAuth.id, {
      current_password: props.currentPass,
      password: props.password,
      confirm_password: props.confirmPass,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={12} md={12} sm={12}>
        <TextField
          onChange={(e) => {
            props.validateCurrentPass(e.target.value);
          }}
          helperText={
            props.currentPassError === "" ? " " : props.currentPassError
          }
          error={props.currentPassError === "" ? false : true}
          required
          name="current-password"
          label="Current Password"
          id="current-password"
          InputLabelProps={{ required: false }}
          size="small"
          fullWidth
          type="password"
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12}>
        <TextField
          onKeyUp={(e) => {
            props.validatePassword(e.target.value);
          }}
          helperText={props.passwordError === "" ? " " : props.passwordError}
          error={props.passwordError === "" ? false : true}
          required
          name="password"
          label="Password"
          id="password"
          InputLabelProps={{ required: false }}
          size="small"
          fullWidth
          type="password"
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12}>
        <TextField
          onKeyUp={(e) => {
            props.validateConfirmPass(e.target.value);
          }}
          helperText={
            props.confirmPassError === "" ? " " : props.confirmPassError
          }
          error={props.confirmPassError === "" ? false : true}
          required
          name="confirm_password"
          label="Confirm Password"
          id="confirm_password"
          autoComplete="new-password"
          InputLabelProps={{ required: false }}
          size="small"
          fullWidth
          type="password"
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12}>
        <Button
          variant="outlined"
          sx={{ mt: 1, mb: 2 }}
          size="small"
          fullWidth
          disabled={submitDisabled}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Grid>
    </Grid>
  );
};

const mapToStateProps = (state) => {
  return {
    userAuth: state.auth.userAuth,
    currentPass: state.profile.currentPass,
    password: state.profile.password,
    confirmPass: state.profile.confirmPass,
    currentPassError: state.profile.currentPassError,
    passwordError: state.profile.passwordError,
    confirmPassError: state.profile.confirmPassError,
    isValidCurrentPass: state.profile.isValidCurrentPass,
    isValidPassword: state.profile.isValidPassword,
    isValidConfirmPass: state.profile.isValidConfirmPass,
    requestError: state.profile.requestError,
    requestErrorMessage: state.profile.requestErrorMessage,
  };
};

export default connect(mapToStateProps, {
  validateCurrentPass,
  validatePassword,
  validateConfirmPass,
  updatePassword,
})(EditPassword);

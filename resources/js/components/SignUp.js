import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Link,
  InputAdornment,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Footer from "./layouts/Footer";
import {
  freshState,
  signUp,
  validateEmail,
  validatePassword,
  validateConfirmPass,
  validateFname,
  validateLname,
  showPassword,
  showConfirmPass,
  disableSubmit,
} from "../actions/auth";

const SignUp = (props) => {
  const navigate = useNavigate();

  // This will run, if there is changes in the state
  useEffect(() => {
    // Enable the submit button if no errors in fields
    if (
      props.isValidEmail &&
      props.isValidPassword &&
      props.isValidConfirmPass &&
      props.isValidFname &&
      props.isValidLname
    ) {
      props.disableSubmit(false);
    }
  }, [
    props.isValidEmail,
    props.isValidPassword,
    props.isValidConfirmPass,
    props.isValidFname,
    props.isValidLname,
  ]);

  useEffect(() => {
    // If successfully registered, navigate to Sign In page
    if (props.requestError === false) {
      props.disableSubmit(true);
      const timer = setTimeout(() => {
        // Re-initialize the state before navigating to the component
        props.freshState();

        navigate("/");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [props.requestError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    props.signUp(data);
  };

  const navigateToSignIn = (e) => {
    e.preventDefault();

    props.freshState();
    navigate("/");
  };

  // Toggle Show Password
  const handleShowPassword = () => {
    props.showPassword(props.isShownPass);
  };

  // Toggle Show Confirm Password
  const handleShowConfirmPass = () => {
    props.showConfirmPass(props.isShownConfirmPass);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onKeyUp={(e) => {
                  props.validateFname(e.target.value);
                }}
                helperText={props.fnameError === "" ? " " : props.fnameError}
                error={props.fnameError === "" ? false : true}
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                InputLabelProps={{ required: false }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onKeyUp={(e) => {
                  props.validateLname(e.target.value);
                }}
                helperText={props.lnameError === "" ? " " : props.lnameError}
                error={props.lnameError === "" ? false : true}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                InputLabelProps={{ required: false }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onKeyUp={(e) => {
                  props.validateEmail(e.target.value);
                }}
                helperText={props.emailError === "" ? " " : props.emailError}
                error={props.emailError === "" ? false : true}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputLabelProps={{ required: false }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onKeyUp={(e) => {
                  props.validatePassword("signUp", e.target.value);
                }}
                helperText={
                  props.passwordError === "" ? " " : props.passwordError
                }
                error={props.passwordError === "" ? false : true}
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="new-password"
                InputLabelProps={{ required: false }}
                type={!props.isShownPass ? "password" : "text"}
                defaultValue={props.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {props.isShownPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onKeyUp={(e) => {
                  props.validateConfirmPass(e.target.value);
                }}
                helperText={
                  props.confirmPassError === "" ? " " : props.confirmPassError
                }
                error={props.confirmPassError === "" ? false : true}
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="new-password"
                InputLabelProps={{ required: false }}
                autoComplete="off"
                type={!props.isShownConfirmPass ? "password" : "text"}
                defaultValue={props.confirmPass}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowConfirmPass}
                        edge="end"
                      >
                        {props.isShownConfirmPass ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Typography
            component="h6"
            variant="h6"
            style={{
              color: `${props.requestError ? "red" : "green"}`,
              fontWeight: `${props.requestError ? "" : "bold"}`,
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            {props.requestErrorMessage}
            &nbsp;
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            disabled={props.isSubmitDisabled}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="" variant="body2" onClick={navigateToSignIn}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer sx={{ mt: 5 }} />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    emailError: state.auth.emailError,
    password: state.auth.password,
    passwordError: state.auth.passwordError,
    confirmPass: state.auth.confirmPass,
    confirmPassError: state.auth.confirmPassError,
    fnameError: state.auth.fnameError,
    lnameError: state.auth.lnameError,
    isValidEmail: state.auth.isValidEmail,
    isValidPassword: state.auth.isValidPassword,
    isValidConfirmPass: state.auth.isValidConfirmPass,
    isValidFname: state.auth.isValidFname,
    isValidLname: state.auth.isValidLname,
    requestError: state.auth.requestError,
    requestErrorMessage: state.auth.requestErrorMessage,
    isShownPass: state.auth.isShownPass,
    isShownConfirmPass: state.auth.isShownConfirmPass,
    isSubmitDisabled: state.auth.isSubmitDisabled,
  };
};

export default connect(mapStateToProps, {
  freshState,
  signUp,
  validateEmail,
  validatePassword,
  validateConfirmPass,
  validateFname,
  validateLname,
  showPassword,
  showConfirmPass,
  disableSubmit,
})(SignUp);

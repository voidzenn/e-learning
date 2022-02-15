import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
} from "../actions/userAuthActions";

const SignUp = (props) => {
	// When navigated to this component, re-initialize this component
	useEffect(() => {
		props.freshState();
		console.log("sign up");
		console.log(props.password);
	}, []);

	// This will run, if there is changes in the state
	useEffect(() => {
		// Enable the submit button if no errors in fields
		if (
			props.isValidEmail === true &&
			props.isValidPassword === true &&
			props.isValidConfirmPass === true &&
			props.isValidFname === true &&
			props.isValidLname === true
		) {
			props.disableSubmit(false);
		}
	}, [props]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		props.signUp(data);
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
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Typography component="h6" variant="h6" style={{ color: "red" }}>
					{props.requestErrorMessage}
					&nbsp;
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
									props.validatePassword(e.target.value);
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
								type={props.isShownPass === false ? "password" : "text"}
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
								name="confirmPass"
								label="Confirm Password"
								type="password"
								id="confirmPass"
								autoComplete="new-password"
								InputLabelProps={{ required: false }}
								autoComplete="off"
								type={props.isShownConfirmPass === false ? "password" : "text"}
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={props.isSubmitDisabled}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Link href="" component={LinkRouter} to="/" variant="body2">
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

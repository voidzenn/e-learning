import {
	SIGN_IN,
	SIGN_UP,
	VALIDATE_EMAIL,
	VALIDATE_PASSWORD,
	VALIDATE_CONFIRMPASS,
	VALIDATE_FNAME,
	VALIDATE_LNAME,
	FRESH_STATE,
	SHOW_PASSWORD,
	SHOW_CONFIRMPASSWORD,
	TOGGLE_SUBMITBTN,
} from "../actions/types";

const initialState = {
	emailError: "",
	password: "",
	passwordError: "",
	confirmPass: "",
	confirmPassError: "",
	fnameError: "",
	lnameError: "",
	requestError: "",
	requestErrorMessage: "",
	isValidEmail: false,
	isValidPassword: false,
	isValidConfirmPass: false,
	isValidFname: false,
	isValidLname: false,
	isShownPass: false,
	isShownConfirmPass: false,
	isSubmitDisabled: true,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				requestError: action.requestError,
				requestErrorMessage: action.requestErrorMessage,
			};
		case SIGN_UP:
			return {
				...state,
				requestError: action.requestError,
				requestErrorMessage: action.requestErrorMessage,
			};
		case VALIDATE_EMAIL:
			return {
				...state,
				emailError: action.emailError,
				isValidEmail: action.isValidEmail,
			};
		case VALIDATE_PASSWORD:
			return {
				...state,
				password: action.password,
				passwordError: action.passwordError,
				isValidPassword: action.isValidPassword,
			};
		case VALIDATE_FNAME:
			return {
				...state,
				fnameError: action.fnameError,
				isValidFname: action.isValidFname,
			};
		case VALIDATE_CONFIRMPASS:
			return {
				...state,
				confirmPass: action.confirmPass,
				confirmPassError: action.confirmPassError,
				isValidConfirmPass: action.isValidConfirmPass,
			};
		case VALIDATE_LNAME:
			return {
				...state,
				lnameError: action.lnameError,
				isValidLname: action.isValidLname,
			};
		case SHOW_PASSWORD:
			return {
				...state,
				isShownPass: action.isShownPass,
			};
		case SHOW_CONFIRMPASSWORD:
			return {
				...state,
				isShownConfirmPass: action.isShownConfirmPass,
			};
		case FRESH_STATE:
			return {
				...state,
				password: action.password,
			};
		case TOGGLE_SUBMITBTN:
			return {
				...state,
				isSubmitDisabled: action.isSubmitDisabled,
			};
		default:
			return state;
	}
};

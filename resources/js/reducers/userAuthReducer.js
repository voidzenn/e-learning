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
    emailErrorSignUp: "",
    password: "",
    passwordSignIn: "",
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
            /*
                Navigating to Sign In or Sign Up when you input in the email or
                password field, the values will be the same when you go to the Sign
                Up page.There were problems in re-initializing the state into initial state.
                So this is a fix to force the states to be re-initialize.
            */
            return {
                ...state,
                emailError: "",
                password: "",
                passwordError: "",
                confirmPass: "",
                confirmPassError: "",
                isShownPass: false,
                isShownConfirmPass: false,
                requestError: "",
                requestErrorMessage: "",
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

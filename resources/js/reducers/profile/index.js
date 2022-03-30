import {
  SET_PROFILE_EDIT,
  VALIDATE_FNAME,
  VALIDATE_LNAME,
  VALIDATE_EMAIL,
  VALIDATE_CURRENT_PASS,
  VALIDATE_PASSWORD,
  VALIDATE_CONFIRMPASS,
  PASSWORD_MISMATCH,
  INVALID_CURRENT_PASS,
  UPDATE_USER,
  UPDATE_PASSWORD,
  FRESH_PROFILE,
} from "../../actions/profile/types";

const initialState = {
  fname: "",
  lname: "",
  email: "",
  fnameError: "",
  lnameError: "",
  emailError: "",
  isValidFname: false,
  isValidLname: false,
  isValidEmail: false,
  currentPass: "",
  currentPassError: "",
  password: "",
  passwordError: "",
  confirmPass: "",
  confirmPassError: "",
  isValidCurrentPass: false,
  isValidPassword: false,
  isValidConfirmPass: false,
  requestError: "",
  requestErrorMessage: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_EDIT:
      return {
        ...state,
        fname: action.fname,
        lname: action.lname,
        email: action.email,
      };
    case VALIDATE_FNAME:
      return {
        ...state,
        fnameError: action.fnameError,
        isValidFname: action.isValidFname,
        fname: action.fname,
      };
    case VALIDATE_LNAME:
      return {
        ...state,
        lnameError: action.lnameError,
        isValidLname: action.isValidLname,
        lname: action.lname,
      };
    case VALIDATE_EMAIL:
      return {
        ...state,
        emailError: action.emailError,
        isValidEmail: action.isValidEmail,
        email: action.email,
      };
    case VALIDATE_CURRENT_PASS:
      return {
        ...state,
        currentPass: action.currentPass,
        currentPassError: action.currentPassError,
        isValidCurrentPass: action.isValidCurrentPass,
      };
    case VALIDATE_PASSWORD:
      return {
        ...state,
        password: action.password,
        passwordError: action.passwordError,
        isValidPassword: action.isValidPassword,
      };
    case VALIDATE_CONFIRMPASS:
      return {
        ...state,
        confirmPass: action.confirmPass,
        confirmPassError: action.confirmPassError,
        isValidConfirmPass: action.isValidConfirmPass,
      };
    case PASSWORD_MISMATCH:
      return {
        ...state,
        confirmPassError: action.confirmPassError,
        isValidConfirmPass: false,
      };
    case INVALID_CURRENT_PASS:
      return {
        ...state,
        currentPassError: action.currentPassError,
        isValidCurrentPass: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
      };
    case UPDATE_PASSWORD:
      if (action.requestError === false) {
        return {
          ...state,
          currentPass: "",
          password: "",
          confirmPass: "",
          requestError: action.requestError,
          requestErrorMessage: action.requestErrorMessage,
        };
      } else {
        return {
          ...state,
        };
      }
    case FRESH_PROFILE:
      return {
        ...state,
        fname: "",
        lname: "",
        email: "",
        fnameError: "",
        lnameError: "",
        emailError: "",
        isValidFname: false,
        isValidLname: false,
        isValidEmail: false,
        currentPass: "",
        currentPassError: "",
        password: "",
        passwordError: "",
        confirmPass: "",
        confirmPassError: "",
        isValidCurrentPass: false,
        isValidPassword: false,
        isValidConfirmPass: false,
        requestError: "",
        requestErrorMessage: "",
      };
    default:
      return state;
  }
};

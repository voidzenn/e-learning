import userApi from "../../apis/userApi";
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
  VALIDATE_CONFIRMPASS,
  VALIDATE_FNAME,
  VALIDATE_LNAME,
  FRESH_STATE,
  SHOW_PASSWORD,
  SHOW_CONFIRMPASSWORD,
  TOGGLE_SUBMITBTN,
  USER_AUTH_DETAILS,
} from "./types";

// This will be change in the action creators
var data = {};

/*
  When you navigate to the Sign In Page, the
  state has data already which was not cleared. 
  refreshPage function helps in re-initializing
  your state
*/
export const freshState = () => (dispatch) => {
  dispatch({
    type: FRESH_STATE,
  });
};
/*  
    Sign In
*/
export const signIn = (formData) => async (dispatch) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const users = {
    email: email,
    password: password,
  };

  // Check both the email and password field are not empty
  if (email !== "" && password !== "") {
    await userApi.post("/sign-in", users).then((response) => {
      data = {
        requestError: response.data.errors,
        requestErrorMessage: response.data.message,
        token: response.data.token,
        userAuth: response.data.user_auth,
      };
    });
    // Assigns the userAuth with auth values
    if (data.requestError === false) {
      // Iterate the token to userAuth data
      const token = data.token;
      dispatch({
        type: USER_AUTH_DETAILS,
        userAuth: { ...data.userAuth, token },
      });
    }
  } else {
    /*
      The input validation is handled already and this
      is for safe measures, if ever the email or the 
      password fields are empty. 
    */
    data = {
      requestError: true,
      requestErrorMessage: "Error...Please, Try Again",
    };
  }

  dispatch({
    type: SIGN_IN,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
  });
};
/*  
    Sign Up
*/
export const signUp = (formData) => async (dispatch) => {
  const fname = formData.get("firstName");
  const lname = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPass = formData.get("confirm_password");

  const users = {
    fname: fname,
    lname: lname,
    email: email,
    password: password,
    confirm_password: confirmPass,
  };

  // Display an error if password and confirm password is mismatched
  if (password !== confirmPass) {
    dispatch({
      type: VALIDATE_CONFIRMPASS,
      confirmPassError: "Password Mismatch",
      isValidConfirmPass: false,
    });
  } else {
    if (
      fname !== "" &&
      lname !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPass !== ""
    ) {
      await userApi
        .post("/sign-up", users)
        .then((response) => {
          data = {
            requestError: response.data.error,
            requestErrorMessage: response.data.message,
          };
        })
        .catch((error) => {
          data = {
            requestError: true,
            requestErrorMessage: error.response.data.errors.email[0],
          };
        });
    } else {
      /*
        The input validation is handled already and this
        is for safe measures, if ever some of the fields
        are empty. 
      */
      data = {
        requestError: true,
        requestErrorMessage: "Error...Please, Try Again",
      };
    }
    dispatch({
      type: SIGN_UP,
      requestError: data.requestError,
      requestErrorMessage: data.requestErrorMessage,
    });
  }
};
/*  
  Sign Out
*/
export const signOut = (id) => async (dispatch) => {
  if (id !== "") {
    await userApi
      .post(`${id}/sign-out`)
      .then((response) => {
        data = {
          requestError: false,
          requestErrorMessage: response.data.requestErrorMessage,
        };
      })
      .catch((error) => {
        data = {
          requestError: true,
          requestErrorMessage: response.data.requestErrorMessage,
        };
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
    };
  }

  dispatch({
    type: SIGN_OUT,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
  });
};
/*  
  Validate Email
*/
export const validateEmail = (email) => (dispatch) => {
  var isValid = false;
  var message = "";

  if (email === "") {
    message = "This field should not be empty";
  } else {
    const check = /\S+@\S+\.\S+/;
    const validation = check.test(email);

    if (validation === true) {
      isValid = true;
    } else {
      message = "Invalid Email Format";
    }
  }

  dispatch({
    type: VALIDATE_EMAIL,
    emailError: message,
    isValidEmail: isValid,
  });
};
/*  
  Validate Password
*/
export const validatePassword = (type, password) => (dispatch) => {
  var isValid = false;
  var message = "";

  if (password === "") {
    message = "This field should not be empty";
  } else {
    // Displays error if password does not meet requirements
    if (type === "signUp") {
      if (password.length < 8) {
        message = "Minimum of 8 characters";
      } else {
        isValid = true;
      }
    } else {
      isValid = true;
    }
  }

  dispatch({
    type: VALIDATE_PASSWORD,
    password: password,
    passwordError: message,
    isValidPassword: isValid,
  });
};
/*  
  Validate Confirm Password
*/
export const validateConfirmPass = (confirmPass) => (dispatch) => {
  var isValid = false;
  var message = "";

  if (confirmPass === "") {
    message = "This field should not be empty";
  } else {
    isValid = true;
  }

  dispatch({
    type: VALIDATE_CONFIRMPASS,
    confirmPass: confirmPass,
    confirmPassError: message,
    isValidConfirmPass: isValid,
  });
};
/*  
  Validate First Name
*/
export const validateFname = (fname) => (dispatch) => {
  var isValid = false;
  var message = "";

  if (fname === "") {
    message = "Should not be empty";
  } else {
    isValid = true;
  }

  dispatch({
    type: VALIDATE_FNAME,
    fnameError: message,
    isValidFname: isValid,
  });
};
/*  
  Validate Last Name
*/
export const validateLname = (lname) => (dispatch) => {
  var isValid = false;
  var message = "";

  if (lname === "") {
    message = "Should not be empty";
  } else {
    isValid = true;
  }

  dispatch({
    type: VALIDATE_LNAME,
    lnameError: message,
    isValidLname: isValid,
  });
};
/*  
  Toggle Password Visibility
*/
export const showPassword = (isShown) => (dispatch) => {
  dispatch({
    type: SHOW_PASSWORD,
    isShownPass: isShown === true ? false : true,
  });
};
/*  
  Toggle Confirm Password Visibility
*/
export const showConfirmPass = (isShown) => (dispatch) => {
  dispatch({
    type: SHOW_CONFIRMPASSWORD,
    isShownConfirmPass: isShown === true ? false : true,
  });
};
/*  
  Handle enable/disable of submit button
*/
export const disableSubmit = (isDisabled) => (dispatch) => {
  dispatch({
    type: TOGGLE_SUBMITBTN,
    isSubmitDisabled: isDisabled,
  });
};
/*  
  Assign user auth details value with cookie values
*/
export const setUserAuthDetails = (userAuth) => (dispatch) => {
  dispatch({
    type: USER_AUTH_DETAILS,
    userAuth: userAuth,
  });
};

import userApi from "../../apis/userApi";
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
} from "./types";

var data = {};

export const setProfileEdit = (editData) => (dispatch) => {
  dispatch({
    type: SET_PROFILE_EDIT,
    fname: editData.fname !== "" ? editData.fname : "",
    lname: editData.lname !== "" ? editData.lname : "",
    email: editData.email !== "" ? editData.email : "",
  });
};

export const validateFname = (fname) => (dispatch) => {
  var isValid = false;
  var message = "";

  if (fname === "") {
    message = "Should not be empty";
  } else {
    // Displays error if does not meet requirements
    if (fname.length > 40) {
      message = "Maximum of 40 characters only";
    } else {
      isValid = true;
    }
  }

  dispatch({
    type: VALIDATE_FNAME,
    fnameError: message,
    isValidFname: isValid,
    fname: fname,
  });
};

export const validateLname = (lname) => (dispatch) => {
  var isValid = false;
  var message = "";

  if (lname === "") {
    message = "Should not be empty";
  } else {
    // Displays error if does not meet requirements
    if (lname.length > 40) {
      message = "Maximum of 40 characters only";
    } else {
      isValid = true;
    }
  }

  dispatch({
    type: VALIDATE_LNAME,
    lnameError: message,
    isValidLname: isValid,
    lname: lname,
  });
};

export const validateEmail = (email) => (dispatch) => {
  var isValid = false;
  var message = "";

  if (email === "") {
    message = "This field should not be empty";
  } else {
    const check = /\S+@\S+\.\S+/;
    const validation = check.test(email);

    if (validation === true) {
      // Displays error if does not meet requirements
      if (email.length > 40) {
        message = "Maximum of 40 characters only";
      } else {
        isValid = true;
      }
    } else {
      message = "Invalid Email Format";
    }
  }

  dispatch({
    type: VALIDATE_EMAIL,
    emailError: message,
    isValidEmail: isValid,
    email: email,
  });
};

export const validateCurrentPass = (currentPass) => (dispatch) => {
  var isValid = false;
  var message = "";

  if (currentPass === "") {
    message = "This field should not be empty";
  } else {
    // Displays error if does not meet requirements
    if (currentPass.length > 30) {
      message = "Maximum of 30 characters only";
    } else {
      isValid = true;
    }
  }

  dispatch({
    type: VALIDATE_CURRENT_PASS,
    currentPass: currentPass,
    currentPassError: message,
    isValidCurrentPass: isValid,
  });
};

export const validatePassword = (password) => (dispatch) => {
  var isValid = false;
  var message = "";

  if (password === "") {
    message = "This field should not be empty";
  } else {
    // Displays error if does not meet requirements
    if (password.length < 8) {
      message = "Minimum of 8 characters";
    } else {
      // Displays error if does not meet requirements
      if (password.length > 30) {
        message = "Maximum of 30 characters only";
      } else {
        isValid = true;
      }
    }
  }

  dispatch({
    type: VALIDATE_PASSWORD,
    password: password,
    passwordError: message,
    isValidPassword: isValid,
  });
};

export const validateConfirmPass = (confirmPass) => (dispatch) => {
  var isValid = false;
  var message = "";

  if (confirmPass === "") {
    message = "This field should not be empty";
  } else {
    // Displays error if does not meet requirements
    if (confirmPass.length > 30) {
      message = "Maximum of 30 characters only";
    } else {
      isValid = true;
    }
  }

  dispatch({
    type: VALIDATE_CONFIRMPASS,
    confirmPass: confirmPass,
    confirmPassError: message,
    isValidConfirmPass: isValid,
  });
};

export const updateUser = (token, userId, requestData) => async (dispatch) => {
  if (token !== "" && userId !== "" && requestData !== "") {
    await userApi(`/users/${userId}/update`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: requestData,
    })
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
        dispatch({
          type: VALIDATE_EMAIL,
          emailError: error.response.data.errors.email[0],
          isValidEmail: false,
          email: "",
        });
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
    };
  }
  dispatch({
    type: UPDATE_USER,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
  });
};

export const updatePassword =
  (token, userId, requestData) => async (dispatch) => {
    if (token !== "" && userId !== "" && requestData !== "") {
      // Check if not same password
      if (requestData.password === requestData.confirm_password) {
        // Check if current password not the same as password
        if (requestData.current_password !== requestData.password) {
          await userApi(`/users/${userId}/update-password`, {
            method: "put",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: requestData,
          })
            .then((response) => {
              data = {
                requestError: response.data.error,
                requestErrorMessage: response.data.message,
              };
              /**
               * Display error message that current password is invalid
               */
              if (response.data.error === true) {
                dispatch({
                  type: INVALID_CURRENT_PASS,
                  currentPassError: response.data.message,
                });
              }
            })
            .catch((error) => {
              data = {
                requestError: true,
                requestErrorMessage: error.response.data.errors,
              };
            });
        } else {
          data = {
            requestError: true,
            requestErrorMessage: "Cannot use previous password",
          };
          dispatch({
            type: VALIDATE_PASSWORD,
            password: requestData.password,
            passwordError: "Cannot use previous password",
            isValidPassword: false,
          });
        }
      } else {
        dispatch({
          type: PASSWORD_MISMATCH,
          confirmPassError: "Password Mismatch",
        });
      }
    } else {
      data = {
        requestError: true,
        requestErrorMessage: "Unauthorized Action",
      };
    }
    dispatch({
      type: UPDATE_PASSWORD,
      requestError: data.requestError,
      requestErrorMessage: data.requestErrorMessage,
    });
  };

export const freshProfile = () => (dispatch) => {
  dispatch({
    type: FRESH_PROFILE,
  });
};

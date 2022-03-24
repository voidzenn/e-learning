import {
  FETCH_USERS,
  FETCH_SINGLE_USER,
  CHANGE_ROLE,
  FRESH_USER,
} from "./types";
import userApi from "../../apis/userApi";

var data = {};

export const fetchUsers = (token, page) => async (dispatch) => {
  if (token !== "") {
    await userApi
      .get(`/users${page !== "" ? "?page=" + page : ""}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        data = {
          userData: response.data,
        };
      });
  } else {
    data = {};
  }
  dispatch({
    type: FETCH_USERS,
    userData: data.userData,
  });
};

export const fetchSingleUser = (token, userId) => async (dispatch) => {
  if (token !== "" && userId !== "") {
    await userApi(`/users/${userId}/show`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: response.data.message,
          singleUserData: response.data.data,
        };
      })
      .catch((error) => {
        data = {
          requestError: error.response.data.error,
          requestErrorMessage: error.response.data.message,
          singleUserData: [],
        };
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
      singleUserData: [],
    };
  }
  dispatch({
    type: FETCH_SINGLE_USER,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    singleUserData: data.singleUserData,
  });
};

export const changeRole = (token, userData) => async (dispatch) => {
  const indexId = userData.key;
  const userId = userData.userId;
  const isAdmin = userData.isAdmin;
  // Change the role base on the current isAdmin
  const new_role = isAdmin === 0 ? 1 : 0;

  if (token !== "" && indexId !== "" && userId !== "" && isAdmin !== "") {
    await userApi(`/users/${userId}/changeRole`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        new_role: new_role,
      },
    })
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: response.data.message,
          indexId: indexId,
          isAdmin: new_role,
        };
      })
      .catch((error) => {
        data = {
          requestError: true,
          requestErrorMessage: error.response.data.message,
          indexId: null,
          isAdmin: null,
        };
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
      indexId: null,
      isAdmin: null,
    };
  }

  dispatch({
    type: CHANGE_ROLE,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    indexId: data.indexId,
    // The new role value is passed
    isAdmin: data.isAdmin,
  });
};

export const freshUser = () => (dispatch) => {
  dispatch({
    type: FRESH_USER,
  });
};

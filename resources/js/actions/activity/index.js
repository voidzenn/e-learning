import userApi from "../../apis/userApi";
import { FETCH_ACTIVITY, FETCH_SINGLE_ACTIVITY } from "./types";

var data = {};

export const fetchActivity = (token) => async (dispatch) => {
  if (token !== "") {
    await userApi("/activities", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: response.data.message,
          activities: response.data.activities,
        };
      })
      .catch((error) => {
        data = {
          requestError: true,
          requestErrorMessage: error.response.data.message,
          activities: [],
        };
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
      activities: [],
    };
  }
  dispatch({
    type: FETCH_ACTIVITY,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    activities: data.activities,
  });
};

export const fetchSingleActivity = (token, userId) => async (dispatch) => {
  if (token !== "" && userId !== "") {
    await userApi(`/activities/${userId}/show`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: response.data.message,
          activities: response.data.activities,
        };
      })
      .catch((error) => {
        data = {
          requestError: true,
          requestErrorMessage: error.response.data.message,
          activities: [],
        };
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
      activities: [],
    };
  }
  dispatch({
    type: FETCH_SINGLE_ACTIVITY,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    activities: data.activities,
  });
};

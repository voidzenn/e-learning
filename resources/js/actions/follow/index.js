import userApi from "../../apis/userApi";
import {
  FETCH_FOLLOW_DATA,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SET_FOLLOWERS,
  SET_FOLLOWING,
  SET_UNFOLLOW_BUTTON,
  FRESH_FOLLOW,
} from "./types";

var data = {};
// Get currenly signed in user follow data
export const fetchFollowData = (token, userId) => async (dispatch) => {
  if (token !== "" && userId !== "") {
    await userApi(`/follows/${userId}/show`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: response.data.message,
          followData: response.data.follows,
        };
      })
      .catch(() => {
        data = {
          requestError: true,
          requestErrorMessage: "Unauthorized Action",
          followData: [],
        };
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
      followData: [],
    };
  }
  dispatch({
    type: FETCH_FOLLOW_DATA,
    requestError: data.requestData,
    requestErrorMessage: data.requestErrorMessage,
    followData: data.followData,
  });
};

export const followUser = (token, requestData) => async (dispatch) => {
  if (token !== "" && requestData !== "") {
    await userApi("/follows/store", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: requestData,
    })
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: response.data.message,
          isFollowButton: false,
        };
      })
      .catch((error) => {
        data = {
          requestError: true,
          requestErrorMessage: error.response.data.message,
          isFollowButton: true,
        };
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
      isFollowButton: true,
    };
  }
  dispatch({
    type: FOLLOW_USER,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    isFollowButton: data.isFollowButton,
  });
};

export const unfollowUser = (token, requestData) => async (dispatch) => {
  if (token !== "" && requestData !== "") {
    await userApi("/follows/destroy", {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: requestData,
    })
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: response.data.message,
          isFollowButton: true,
        };
      })
      .catch((error) => {
        data = {
          requestError: true,
          requestErrorMessage: error.response.data.message,
          isFollowButton: false,
        };
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
      isFollowButton: false,
    };
  }
  dispatch({
    type: UNFOLLOW_USER,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    isFollowButton: data.isFollowButton,
  });
};
// Set the followers count
export const setFollower = (followers) => (dispatch) => {
  dispatch({
    type: SET_FOLLOWERS,
    followers: followers !== "" ? followers : 0,
  });
};
// Set the following count
export const setFollowing = (following) => (dispatch) => {
  dispatch({
    type: SET_FOLLOWING,
    following: following !== "" ? following : 0,
  });
};
// Set button to unfollow button
export const setToUnfollow = () => (dispatch) => {
  dispatch({
    type: SET_UNFOLLOW_BUTTON,
    isFollowButton: false,
  });
};
// Intialize the state of follow state
export const freshFollow = () => (dispatch) => {
  dispatch({
    type: FRESH_FOLLOW,
  });
};

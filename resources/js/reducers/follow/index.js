import {
  FETCH_FOLLOW_DATA,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SET_FOLLOWERS,
  SET_FOLLOWING,
  SET_UNFOLLOW_BUTTON,
  FRESH_FOLLOW,
} from "../../actions/follow/types";

const initializedState = {
  requestError: "",
  requestErrorMessage: "",
  isFollowButton: true,
  followData: [],
  followers: 0,
  following: 0,
};

export default (state = initializedState, action) => {
  switch (action.type) {
    case FETCH_FOLLOW_DATA:
      return {
        ...state,
        followData: action.followData,
      };
    case FOLLOW_USER:
      if (!action.error) {
        return {
          ...state,
          requestError: action.requestError,
          requestErrorMessage: action.requestErrorMessage,
          isFollowButton: action.isFollowButton,
          followers: state.followers + 1,
        };
      } else {
        return {
          ...state,
          requestError: action.requestError,
          requestErrorMessage: action.requestErrorMessage,
          isFollowButton: action.isFollowButton,
        };
      }
    case UNFOLLOW_USER:
      if (!action.error) {
        return {
          ...state,
          requestError: action.requestError,
          requestErrorMessage: action.requestErrorMessage,
          isFollowButton: action.isFollowButton,
          followers: state.followers - 1,
        };
      } else {
        return {
          ...state,
          requestError: action.requestError,
          requestErrorMessage: action.requestErrorMessage,
          isFollowButton: action.isFollowButton,
        };
      }
    case SET_FOLLOWERS:
      return {
        ...state,
        followers: action.followers,
      };
    case SET_FOLLOWING:
      return {
        ...state,
        following: action.following,
      };
    case SET_UNFOLLOW_BUTTON:
      return {
        ...state,
        isFollowButton: action.isFollowButton,
      };
    case FRESH_FOLLOW:
      return {
        ...state,
        requestError: "",
        requestErrorMessage: "",
        isFollowButton: true,
        followData: [],
        followers: 0,
        following: 0,
      };
    default:
      return state;
  }
};

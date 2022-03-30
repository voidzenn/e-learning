import {
  FETCH_ACTIVITY,
  FETCH_SINGLE_ACTIVITY,
} from "../../actions/activity/types";

const initializeState = {
  requestError: "",
  requestErrorMessage: "",
  activities: [],
};

export default (state = initializeState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITY:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
        activities: action.activities,
      };
    case FETCH_SINGLE_ACTIVITY:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
        activities: action.activities,
      };
    default:
      return state;
  }
};

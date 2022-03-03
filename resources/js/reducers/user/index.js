import { FETCH_USERS, CHANGE_ROLE, FRESH_USER } from "../../actions/user/types";

const initializeState = {
  userData: [],
  requestError: "",
  requestErrorMessage: "",
};

export default (state = initializeState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        userData: action.userData,
      };
    case CHANGE_ROLE:
      return {
        ...state,
        userData: {
          data: Object.entries(state.userData.data).map(([key, user]) =>
            key === action.indexId
              ? {
                  ...user,
                  is_admin: action.isAdmin,
                }
              : user
          ),
        },
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
      };
    case FRESH_USER:
      return {
        ...state,
        requestError: "",
        requestErrorMessage: "",
      }
    default:
      return state;
  }
};



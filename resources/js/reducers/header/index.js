import { SET_URI } from "../../actions/header/types";

const initializeState = {
  uri: "",
};

export default (state = initializeState, action) => {
  switch (action.type) {
    case SET_URI:
      return {
        ...state,
        uri: action.uri,
      };
    default:
      return state;
  }
};

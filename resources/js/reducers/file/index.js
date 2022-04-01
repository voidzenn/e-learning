import {
  UPLOAD_IMAGE,
  SET_PROGRESS,
  FRESH_FILE,
} from "../../actions/file/types";

const initialState = {
  requestError: "",
  requestErrorMessage: "",
  filePath: null,
  progress: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
        filePath: action.filePath,
        progress: action.progress,
      };
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.progress,
      };
    case FRESH_FILE:
      return {
        ...state,
        requestError: "",
        requestErrorMessage: "",
        progress: 0,
      };
    default:
      return state;
  }
};

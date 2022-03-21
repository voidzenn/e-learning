import userApi from "../../apis/userApi";
import { SET_URI } from "./types";
// Handles the navigation state
export const setUri = (uri) => (dispatch) => {
  dispatch({
    type: SET_URI,
    uri: uri !== "" ? uri : "",
  });
};

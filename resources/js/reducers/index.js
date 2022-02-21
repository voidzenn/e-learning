import { combineReducers } from "redux";

import userAuthReducer from "./userAuthReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  auth: userAuthReducer,
  category: categoryReducer,
});

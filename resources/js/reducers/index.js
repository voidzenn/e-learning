import { combineReducers } from "redux";

import userAuthReducer from "./auth";
import categoryReducer from "./category";
import wordReducer from "./word";

export default combineReducers({
  auth: userAuthReducer,
  category: categoryReducer,
  word: wordReducer,
});

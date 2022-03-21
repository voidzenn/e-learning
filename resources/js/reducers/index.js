import { combineReducers } from "redux";

import userAuthReducer from "./auth";
import userReducer from "./user";
import categoryReducer from "./category";
import wordReducer from "./word";
import lessonReducer from "./lesson";

export default combineReducers({
  auth: userAuthReducer,
  user: userReducer,
  category: categoryReducer,
  word: wordReducer,
  lesson: lessonReducer,
});

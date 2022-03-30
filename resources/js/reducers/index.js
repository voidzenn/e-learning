import { combineReducers } from "redux";

import headerReducer from "./header";
import userAuthReducer from "./auth";
import userReducer from "./user";
import categoryReducer from "./category";
import wordReducer from "./word";
import lessonReducer from "./lesson";
import followReducer from "./follow";
import activityReducer from "./activity";

export default combineReducers({
  header: headerReducer,
  auth: userAuthReducer,
  user: userReducer,
  category: categoryReducer,
  word: wordReducer,
  lesson: lessonReducer,
  follow: followReducer,
  activity: activityReducer,
});

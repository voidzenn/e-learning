import {
  SET_LESSON_DATA,
  SET_CATEGORY_USER_ID,
  SET_ANSWER_DATA,
  CHECK_CATEGORY_USER,
  STORE_CATEGORY_USER,
  STORE_ANSWER_USER,
  FETCH_ANSWER_USER_DATA,
  FETCH_ALL_ANSWER,
  SET_SCORE,
  FRESH_LESSON,
} from "../../actions/lesson/types";

const initializeState = {
  lessonData: "",
  answerData: "",
  answerLength: null,
  categoryUserId: null,
  requestError: "",
  requestErrorMessage: "",
  answer_results: [],
  allAnswers: [],
  score: 0,
};

export default (state = initializeState, action) => {
  switch (action.type) {
    case SET_LESSON_DATA:
      return {
        ...state,
        lessonData: action.lessonData,
      };
    case SET_CATEGORY_USER_ID:
      return {
        ...state,
        categoryUserId: action.categoryUserId,
      };
    case SET_ANSWER_DATA:
      return {
        ...state,
        answerData: action.answerData,
      };
    case STORE_CATEGORY_USER:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
        categoryUserId: action.categoryUserId,
      };
    case CHECK_CATEGORY_USER:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
        categoryUserId: action.categoryUserId,
        answerLength: action.answerLength,
      };
    case STORE_ANSWER_USER:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
      };
    case FETCH_ANSWER_USER_DATA:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
        answer_results: action.answer_results,
      };
    case FETCH_ALL_ANSWER:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
        allAnswers: action.allAnswers,
      };
    case SET_SCORE:
      return {
        ...state,
        score: action.score,
      };
    case FRESH_LESSON:
      return {
        ...state,
        lessonData: "",
        answerData: "",
        answerLength: null,
        categoryUserId: null,
        requestError: "",
        requestErrorMessage: "",
        answer_results: [],
        score: 0,
      };
    default:
      return state;
  }
};

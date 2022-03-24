import {
  SET_LESSON_DATA,
  SET_CATEGORY_USER_ID,
  SET_ANSWER_DATA,
  STORE_CATEGORY_USER,
  UPDATE_CATEGORY_USER_COMPLETE,
  CHECK_CATEGORY_USER,
  STORE_ANSWER_USER,
  FRESH_LESSON,
  FETCH_ANSWER_USER_DATA,
  FETCH_ALL_ANSWER,
  SET_SCORE,
} from "./types";
import userApi from "../../apis/userApi";

var data = {};

export const setLessonData = (data) => (dispatch) => {
  dispatch({
    type: SET_LESSON_DATA,
    lessonData: data !== "" ? data : null,
  });
};

export const setCategoryUserId = (id) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_USER_ID,
    categoryUserId: id !== "" ? id : "",
  });
};

export const storeCategoryUser = (token, requestData) => async (dispatch) => {
  if (token !== "" && requestData !== "") {
    await userApi("/lessons/store-category-user", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: requestData,
    })
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: response.data.message,
          /**
           * Assign categoryUserId with, when the data is stored
           * in the category_user. categoryUserId will be used to store
           * the answers to answer_user db table.
           */
          categoryUserId: response.data.category_user_id,
        };
      })
      .catch((error) => {
        data = {
          requestError: true,
          requestErrorMessage: error.response.data.message,
          categoryUserId: "",
        };
      });
  } else {
    data = {
      requestError: false,
      requestErrorMessage: "",
      categoryUserId: "",
    };
  }

  dispatch({
    type: STORE_CATEGORY_USER,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    categoryUserId: data.categoryUserId,
  });
};

export const updateCategoryUserComplete =
  (token, requestData) => async (dispatch) => {
    if (token !== "" && requestData !== "") {
      await userApi("/lessons/update-complete", {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: requestData,
      })
        .then((response) => {
          data = {
            requestError: response.data.error,
            requestErrorMessage: response.data.message,
          };
        })
        .catch((error) => {
          data = {
            requestError: error.response.data.error,
            requestErrorMessage: error.response.data.message,
          };
        });
    } else {
      data = {
        requestError: true,
        requestErrorMessage: "Unauthorized Action",
      };
    }
    dispatch({
      type: UPDATE_CATEGORY_USER_COMPLETE,
      requestError: data.requestError,
      requestErrorMessage: data.requestErrorMessage,
    });
  };

export const checkCategoryUser = (token, requestData) => async (dispatch) => {
  if (token !== "" && data !== "") {
    await userApi(
      `lessons/check-category-user?user_id=${requestData.user_id}&category_id=${requestData.category_id}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: "",
          categoryUserId: response.data.category_user_id,
          answerLength: response.data.answer_length,
        };
      })
      .catch((error) => {
        data = {
          requestError: true,
          requestErrorMessage: error.response.data.message,
          categoryUserId: "",
          answerLength: 0,
        };
      });
  } else {
    data = {
      requestError: false,
      requestErrorMessage: "",
      categoryUserId: data.categoryUserId,
      answerLength: 0,
    };
  }
  dispatch({
    type: CHECK_CATEGORY_USER,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    categoryUserId: data.categoryUserId,
    answerLength: data.answerLength,
  });
};

export const setAnswerData = (requestData) => (dispatch) => {
  dispatch({
    type: SET_ANSWER_DATA,
    answerData: requestData !== "" ? requestData : null,
  });
};

export const storeAnswerUser = (token, requestData) => async (dispatch) => {
  if (token !== "" && requestData !== "") {
    await userApi("/lessons/store-answer-user", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: requestData,
    })
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: response.data.message,
        };
      })
      .catch((error) => {
        data = {
          requestError: true,
          requestErrorMessage: error.response.data.message,
        };
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
    };
  }
  dispatch({
    type: STORE_ANSWER_USER,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
  });
};

export const fetchAnswerUserData = (token, request) => async (dispatch) => {
  if (token !== "" && request !== "") {
    await userApi(
      `/lessons/get-answers?user_id=${request.user_id}&category_id=${request.category_user_id}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: response.data.message,
          answer_results: response.data.answer_results,
        };
      })
      .catch((error) => {
        data = {
          requestError: error.response.data.error,
          requestErrorMessage: error.response.data.message,
          answer_results: error.response.data.answer_results,
        };
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
      answer_results: 0,
    };
  }
  dispatch({
    type: FETCH_ANSWER_USER_DATA,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    answer_results: data.answer_results,
  });
};

export const fetchAllAnswers = (token, user_id) => async (dispatch) => {
  if (token !== "" && user_id !== "") {
    await userApi(`/lessons/get-all-answers?user_id=${user_id}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        data = {
          requestError: response.data.error,
          requestErrorMessage: response.data.message,
          allAnswers: response.data.data,
        };
      })
      .catch((error) => {
        data = {
          requestError: error.response.data.error,
          requestErrorMessage: error.response.data.message,
          allAnswers: [],
        };
      });
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
      allAnswers: [],
    };
  }
  dispatch({
    type: FETCH_ALL_ANSWER,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    allAnswers: data.allAnswers,
  });
};

export const setScore = (score) => (dispatch) => {
  dispatch({
    type: SET_SCORE,
    score: score !== "" ? score : 0,
  });
};

export const freshLesson = () => (dispatch) => {
  dispatch({
    type: FRESH_LESSON,
  });
};

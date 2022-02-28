import userApi from "../../apis/userApi";
import {
  FETCH_WORD_CHOICE,
  CHANGE_SUBMIT_TYPE,
  ADD_WORD_CHOICE,
  UPDATE_WORD_CHOICE,
  DELETE_WORD_CHOICE,
  SET_WORD_CONTENT_DATA,
  VALIDATE_WORD,
  VALIDATE_FIRST_CHOICE,
  VALIDATE_SECOND_CHOICE,
  VALIDATE_THIRD_CHOICE,
  VALIDATE_FOURTH_CHOICE,
  FRESH_WORD_CHOICE,
  EDIT_WORD_CHOICE_DATA,
  REMOVE_EDIT_WORD,
  REMOVE_EDIT_FIRST_CHOICE,
  REMOVE_EDIT_SECOND_CHOICE,
  REMOVE_EDIT_THIRD_CHOICE,
  REMOVE_EDIT_FOURTH_CHOICE,
  REMOVE_EDIT_IS_CORRECT_ANSWER,
  CREATE_NEW_WORD_CHOICE,
} from "./types";

var data = {};

export const fetchChoicesWords =
  (token, id = 1) =>
  async (dispatch) => {
    await userApi
      .get(`/words/${id}/show`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        data = {
          wordsChoices: response.data,
        };
      });

    dispatch({
      type: FETCH_WORD_CHOICE,
      wordsChoices: data.wordsChoices,
    });
  };

export const changeSubmitType = (submitType) => (dispatch) => {
  dispatch({
    type: CHANGE_SUBMIT_TYPE,
    submitType: submitType,
  });
};

export const addWordChoice = (token, formData) => async (dispatch) => {
  const categoryId = formData.get("categoryId"); // Get category id
  const name = formData.get("word");
  const firstChoice = formData.get("firstChoice");
  const secondChoice = formData.get("secondChoice");
  const thirdChoice = formData.get("thirdChoice");
  const fourthChoice = formData.get("fourthChoice");
  const correctAnswer = formData.get("correctAnswer");

  if (token !== "") {
    if (
      categoryId != "" &&
      name !== "" &&
      firstChoice !== "" &&
      secondChoice !== "" &&
      thirdChoice !== "" &&
      fourthChoice !== "" &&
      correctAnswer !== ""
    ) {
      await userApi("/words/store", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: name,
          category_id: categoryId,
          choices: [firstChoice, secondChoice, thirdChoice, fourthChoice],
          correct_answer: correctAnswer,
        },
      })
        .then((response) => {
          data = {
            requestError: response.data.error,
            requestErrorMessage: response.data.message,
            wordError: "",
          };
        })
        .catch((error) => {
          data = {
            requestError: true,
            requestErrorMessage: error.response.data.message,
            wordError: error.response.data.errors.name[0],
          };
        });
    } else {
      data = {
        requestError: true,
        requestErrorMessage: "Some fields are empty",
        wordError: "",
      };
    }
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized action",
    };
  }
  dispatch({
    type: ADD_WORD_CHOICE,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    wordError: data.wordError,
  });
};
/*
  Edit choice data
*/
export const editWordChoiceData = (data) => (dispatch) => {
  dispatch({
    type: EDIT_WORD_CHOICE_DATA,
    editData: data,
    editDataWord: data.word,
    editDataFirstChoice: data.choices[0],
    editDataSecondChoice: data.choices[1],
    editDataThirdChoice: data.choices[2],
    editDataFourthChoice: data.choices[3],
    editDataIsCorrectAnswer: data.isCorrectAnswer,
  });
};
/*
  Remove edit word data
*/
export const removeEditWord = () => (dispatch) => {
  dispatch({
    type: REMOVE_EDIT_WORD,
  });
};
/*
  Remove edit first choice data
*/
export const removeEditFirstChoice = () => (dispatch) => {
  dispatch({
    type: REMOVE_EDIT_FIRST_CHOICE,
  });
};
/*
  Remove edit second choice data
*/
export const removeEditSecondChoice = () => (dispatch) => {
  dispatch({
    type: REMOVE_EDIT_SECOND_CHOICE,
  });
};
/*
  Remove edit third choice data
*/
export const removeEditThirdChoice = () => (dispatch) => {
  dispatch({
    type: REMOVE_EDIT_THIRD_CHOICE,
  });
};
/*
  Remove edit fourth choice data
*/
export const removeEditFourthChoice = () => (dispatch) => {
  dispatch({
    type: REMOVE_EDIT_FOURTH_CHOICE,
  });
};
/*
  Remove edit isCorrectAnswer data
*/
export const removeEditIsCorrectAnswer = () => (dispatch) => {
  dispatch({
    type: REMOVE_EDIT_IS_CORRECT_ANSWER,
  });
};
/*
  Update word and choices
*/
export const updateWordChoice =
  (token, oldData, formData) => async (dispatch) => {
    const wordId = formData.get("wordId");
    const name = formData.get("word");
    const firstChoice = formData.get("firstChoice");
    const secondChoice = formData.get("secondChoice");
    const thirdChoice = formData.get("thirdChoice");
    const fourthChoice = formData.get("fourthChoice");
    const correctAnswer = formData.get("correctAnswer");
    if (token !== "" && oldData !== "" && formData !== "") {
      // Check if has changes of the oldData
      if (
        wordId !== "" &&
        name !== oldData.word.name ||
        firstChoice !== oldData.choices[0] ||
        secondChoice !== oldData.choices[1] ||
        thirdChoice !== oldData.choices[2] ||
        fourthChoice !== oldData.choices[3] ||
        correctAnswer !== oldData.isCorrectAnswer
      ) {
        // If all conditions are meet
        await userApi(`/words/${wordId}/update`, {
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            name: name,
            choices: [firstChoice, secondChoice, thirdChoice, fourthChoice],
            correct_answer: correctAnswer,
          },
        })
          .then((response) => {
            data = {
              requestError: response.data.error,
              requestErrorMessage: response.data.message,
              wordError: "",
            };
          })
          .catch((error) => {
            data = {
              requestError: true,
              requestErrorMessage: error.response.data.message,
              wordError: error.response.data.errors.name[0],
            };
          });
      } else {
        data = {
          requestError: true,
          requestErrorMessage: "Can't Update. You have no changes",
          wordError: "",
        };
      }
    } else {
      data = {
        requestError: true,
        requestErrorMessage: "Unauthorized action",
        wordError: "",
      };
    }
    dispatch({
      type: UPDATE_WORD_CHOICE,
      requestError: data.requestError,
      requestErrorMessage: data.requestErrorMessage,
      wordError: data.wordError,
    });
  };
/*
  Delete word choice
*/
export const deleteWordChoice = (token, word_id) => async (dispatch) => {
  if (token !== "") {
    if (word_id !== "") {
      await userApi(`/words/${word_id}/delete`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          word: word_id,
        },
      });
      data = {
        requestError: false,
        requestErrorMessage: "Success Deleted",
      };
    } else {
      data = {
        requestError: true,
        requestErrorMessage: "Word id is empty",
      };
    }
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
    };
  }

  dispatch({
    type: DELETE_WORD_CHOICE,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
  });
};
/*
  Set word cotent data
*/
export const setWordContentData = (cookieData) => (dispatch) => {
  dispatch({
    type: SET_WORD_CONTENT_DATA,
    wordContentData: cookieData !== "" ? cookieData : null,
  });
};
/*
  Validating of inputs has the same condition and it would be
  best to make a universal funciton. This function returns true
  and a message.  
*/
const validate = (input) => {
  if (input !== "") {
    data = {
      isValid: true,
      message: "",
    };
  } else {
    data = {
      isValid: false,
      message: "This field should not be empty",
    };
  }
  return data;
};

export const validateWord = (input) => (dispatch) => {
  const data = validate(input);

  dispatch({
    type: VALIDATE_WORD,
    word: input,
    isValidWord: data.isValid,
    wordError: data.message,
  });
};

export const validateFirst = (input) => (dispatch) => {
  const data = validate(input);

  dispatch({
    type: VALIDATE_FIRST_CHOICE,
    firstChoice: input,
    isValidFirstChoice: data.isValid,
    firstChoiceError: data.message,
  });
};

export const validateSecond = (input) => (dispatch) => {
  const data = validate(input);

  dispatch({
    type: VALIDATE_SECOND_CHOICE,
    secondChoice: input,
    isValidSecondChoice: data.isValid,
    secondChoiceError: data.message,
  });
};

export const validateThird = (input) => (dispatch) => {
  const data = validate(input);

  dispatch({
    type: VALIDATE_THIRD_CHOICE,
    thirdChoice: input,
    isValidThirdChoice: data.isValid,
    thirdChoiceError: data.message,
  });
};

export const validateFourth = (input) => (dispatch) => {
  const data = validate(input);

  dispatch({
    type: VALIDATE_FOURTH_CHOICE,
    fourthChoice: input,
    isValidFourthChoice: data.isValid,
    fourthChoiceError: data.message,
  });
};

export const createNewWordChoice = () => (dispatch) => {
  dispatch({
    type: CREATE_NEW_WORD_CHOICE,
  });
};

export const freshWordChoice = () => (dispatch) => {
  dispatch({
    type: FRESH_WORD_CHOICE,
  });
};

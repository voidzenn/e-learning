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
} from "../../actions/word/types";

const intializeState = {
  wordsChoices: [],
  requestError: "",
  requestErrorMessage: "",
  editData: [],
  editDataWord: [],
  editDataFirstChoice: "",
  editDataSecondChoice: "",
  editDataThirdChoice: "",
  editDataFourthChoice: "",
  editDataIsCorrectAnswer: "",
  word: "",
  firstChoice: "",
  secondChoice: "",
  thirdChoice: "",
  fourthChoice: "",
  wordError: "",
  firstChoiceError: "",
  secondChoiceError: "",
  thirdChoiceError: "",
  fourthChoiceError: "",
  isValidWord: false,
  isValidFirstChoice: false,
  isValidSecondChoice: false,
  isValidThirdChoice: false,
  isValidFourthChoice: false,
  wordContentData: null,
  // When WordContent first loads, the normal submit would be store
  submitType: "store",
};

export default (state = intializeState, action) => {
  switch (action.type) {
    case FETCH_WORD_CHOICE:
      return {
        ...state,
        wordsChoices: action.wordsChoices,
      };
    case CHANGE_SUBMIT_TYPE:
      return {
        ...state,
        submitType: action.submitType,
      };
    case ADD_WORD_CHOICE:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
        wordError: action.wordError,
        // If no error, then clear field values
        word: action.wordError === "" ? "" : state.word,
        firstChoice: action.wordError === "" ? "" : state.firstChoice,
        secondChoice: action.wordError === "" ? "" : state.secondChoice,
        thirdChoice: action.wordError === "" ? "" : state.thirdChoice,
        fourthChoice: action.wordError === "" ? "" : state.fourthChoice,
      };
    case EDIT_WORD_CHOICE_DATA:
      return {
        ...state,
        editData: action.editData,
        editDataWord: action.editDataWord,
        editDataFirstChoice: action.editDataFirstChoice,
        editDataSecondChoice: action.editDataSecondChoice,
        editDataThirdChoice: action.editDataThirdChoice,
        editDataFourthChoice: action.editDataFourthChoice,
        editDataIsCorrectAnswer: action.editDataIsCorrectAnswer,
        // Remove the field errors
        wordError: "",
        firstChoiceError: "",
        secondChoiceError: "",
        thirdChoiceError: "",
        fourthChoiceError: "",
      };
    case REMOVE_EDIT_WORD:
      return {
        ...state,
        editDataWord: [],
      };
    case REMOVE_EDIT_FIRST_CHOICE:
      return {
        ...state,
        editDataFirstChoice: "",
      };
    case REMOVE_EDIT_SECOND_CHOICE:
      return {
        ...state,
        editDataSecondChoice: "",
      };
    case REMOVE_EDIT_THIRD_CHOICE:
      return {
        ...state,
        editDataThirdChoice: "",
      };
    case REMOVE_EDIT_FOURTH_CHOICE:
      return {
        ...state,
        editDataFourthChoice: "",
      };
    case REMOVE_EDIT_IS_CORRECT_ANSWER:
      return {
        ...state,
        editDataIsCorrectAnswer: "",
      };
    case UPDATE_WORD_CHOICE:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
        wordError: action.wordError,
      };
    case DELETE_WORD_CHOICE:
      return {
        ...state,
        requestError: action.requestError,
        requestErrorMessage: action.requestErrorMessage,
      };
    case SET_WORD_CONTENT_DATA:
      return {
        ...state,
        wordContentData: action.wordContentData,
      }
    case VALIDATE_WORD:
      return {
        ...state,
        word: action.word,
        isValidWord: action.isValidWord,
        wordError: action.wordError,
      };
    case VALIDATE_FIRST_CHOICE:
      return {
        ...state,
        firstChoice: action.firstChoice,
        isValidFirstChoice: action.isValidFirstChoice,
        firstChoiceError: action.firstChoiceError,
      };
    case VALIDATE_SECOND_CHOICE:
      return {
        ...state,
        secondChoice: action.secondChoice,
        isValidSecondChoice: action.isValidSecondChoice,
        secondChoiceError: action.secondChoiceError,
      };
    case VALIDATE_THIRD_CHOICE:
      return {
        ...state,
        thirdChoice: action.thirdChoice,
        isValidThirdChoice: action.isValidThirdChoice,
        thirdChoiceError: action.thirdChoiceError,
      };
    case VALIDATE_FOURTH_CHOICE:
      return {
        ...state,
        fourthChoice: action.fourthChoice,
        isValidFourthChoice: action.isValidFourthChoice,
        fourthChoiceError: action.fourthChoiceError,
      };
    case CREATE_NEW_WORD_CHOICE:
      return {
        ...state,
        editDataWord: "",
        editDataFirstChoice: "",
        editDataSecondChoice: "",
        editDataThirdChoice: "",
        editDataFourthChoice: "",
        // Re-initialize to select the first value
        editDataIsCorrectAnswer: 0,
      };
    case FRESH_WORD_CHOICE:
      return {
        ...state,
        requestError: "",
        requestErrorMessage: "",
      };
    default:
      return state;
  }
};

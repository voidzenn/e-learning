import userApi from "../../apis/userApi";
import {
  FETCH_CATEGORIES,
  CAT_DIALOG_DATA,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  VAILDATE_CAT_NAME,
  VALIDATE_CAT_DESCRIPTION,
  TOGGLE_CAT_SUBMIT,
  FRESH_STATE_CATEGORY,
} from "./types";

// This will be assigned in the actions
var data = {};

/*
  Fetch the categories data. 
  The second parameter page is for
  jumping to differenct pages. 
*/
export const fetchCategories = (token, page) => async (dispatch) => {
  await userApi
    .get(`/categories${page !== "" ? "?page=" + page : ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      data = {
        categories: response.data,
        categoryError: false,
      };
    })
    .catch(() => {
      data = {
        categories: [],
        categoryError: true,
      };
    });

  dispatch({
    type: FETCH_CATEGORIES,
    categories: data.categories,
    categoryError: data.categoryError,
  });
};
/*
  Add/Store category
*/
export const addCatDialogData = (item) => (dispatch) => {
  dispatch({
    type: CAT_DIALOG_DATA,
    dialogData: item,
  });
};
/*
  Add/Store category
*/
export const addCategory = (token, formData) => async (dispatch) => {
  const name = formData.get("name");
  const description = formData.get("description");

  if (token !== "") {
    // If all the conditions are meet
    if (name !== "" && description !== "") {
      await userApi("/categories/store", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: name,
          description: description,
        },
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
        requestErrorMessage: "Some fields are empty",
      };
    }
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
    };
  }

  dispatch({
    type: ADD_CATEGORY,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
  });
};
/*
  Edit category
*/
export const editCategory = (token, formData) => async (dispatch) => {
  const indexId = formData.get("index_id");
  const id = formData.get("idd");
  const name = formData.get("name");
  const description = formData.get("description");

  if (token !== "") {
    if (name !== "") {
      await userApi(`/categories/${id}/update`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: name,
          description: description,
        },
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
        requestErrorMessage: "Name field is empty",
      };
    }
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
    };
  }

  dispatch({
    type: UPDATE_CATEGORY,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    indexId: indexId,
    newName: name,
    newDescription: description,
  });
};
/*
  Delete category
*/
export const deleteCategory = (token, id) => async (dispatch) => {
  if (token !== "") {
    // If all the conditions are meet
    if (id !== "") {
      await userApi(`/categories/${id}/delete`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        requestErrorMessage: "Missing Item Id",
      };
    }
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
    };
  }

  dispatch({
    type: DELETE_CATEGORY,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
  });
};
/*
  Validate category name
*/
export const validateName = (name) => (dispatch) => {
  if (name !== "") {
    dispatch({
      type: VAILDATE_CAT_NAME,
      categoryNameError: "",
      isValidCatName: true,
    });
  } else {
    dispatch({
      type: VAILDATE_CAT_NAME,
      categoryNameError: "This field should not be empty",
    });
  }
};
/*
  Validate category description
*/
export const validateDescription = (description) => (dispatch) => {
  if (description !== "") {
    dispatch({
      type: VALIDATE_CAT_DESCRIPTION,
      categoryDescriptionError: "",
      isValidCatDescription: true,
    });
  } else {
    dispatch({
      type: VALIDATE_CAT_DESCRIPTION,
      categoryDescriptionError: "This field should not be empty",
    });
  }
};

export const disableSubmit = (isDisabled) => (dispatch) => {
  dispatch({
    type: TOGGLE_CAT_SUBMIT,
    isSubmitDisabled: isDisabled === true ? true : false,
  });
};
/*
  Re-initiaze some specific category state values
*/
export const freshStateCategory = () => (dispatch) => {
  dispatch({
    type: FRESH_STATE_CATEGORY,
  });
};

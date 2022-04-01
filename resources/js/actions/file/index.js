import userApi from "../../apis/userApi";
import { SET_PROGRESS, UPLOAD_IMAGE, FRESH_FILE } from "./types";

var data = {};

export const uploadImage = (token, requestData) => async (dispatch) => {
  if (token !== "" && requestData !== "") {
    // Check file size if less than 2 megabytes
    if (requestData.file.size <= 2000000) {
      // Check if mime type is in array
      const mimes = ["jpg", "png", "jpeg", "svg"];
      const fileName = requestData.file.name.split(".").pop();
      if (mimes.includes(fileName)) {
        var formData = new FormData();
        // Assign to form data
        formData.append("file", requestData.file);
        await userApi("/files/upload-image", {
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          data: formData,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            dispatch({
              type: SET_PROGRESS,
              progress: percent,
            });
          },
        })
          .then((response) => {
            data = {
              requestError: response.data.error,
              requestErrorMessage: response.data.message,
              // Location of the uploaded image
              filePath: response.data.file_path,
            };
          })
          .catch((error) => {
            data = {
              requestError: true,
              requestErrorMessage: error.response.data,
              filePath: null,
            };
          });
      } else {
        data = {
          requestError: true,
          requestErrorMessage: "File is not an image",
          filePath: null,
        };
      }
    } else {
      data = {
        requestError: true,
        requestErrorMessage: "File is too large",
        filePath: null,
      };
    }
  } else {
    data = {
      requestError: true,
      requestErrorMessage: "Unauthorized Action",
      filePath: null,
    };
  }
  dispatch({
    type: UPLOAD_IMAGE,
    requestError: data.requestError,
    requestErrorMessage: data.requestErrorMessage,
    filePath: data.filePath,
    progress: 0,
  });
};

export const freshFile = () => (dispatch) => {
  dispatch({
    type: FRESH_FILE,
  });
};

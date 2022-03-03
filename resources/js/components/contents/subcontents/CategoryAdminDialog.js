import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

import {
  addCategory,
  updateCategory,
  deleteCategory,
  validateName,
  validateDescription,
  disableSubmit,
  freshStateCategory,
} from "../../../actions/category";

const CategoryDialog = (props) => {
  // Handles the opening and closng of the Dialog
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // On first load open the Dialog
    if (props.type !== "") {
      setOpen(true);
    }
  }, [props.type]);

  useEffect(() => {
    // This handles the enabling and disabling the submit button
    if (props.isValidCatName && props.isValidCatDescription) {
      props.disableSubmit(false);
    } else {
      props.disableSubmit(true);
    }
  }, [props.isValidCatName, props.isValidCatDescription]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is the textfield data
    const formData = new FormData(e.currentTarget);

    props.addCategory(props.token, formData);
    // When the Dialog is close then re-initialize type as empty and close Dialog
    onClose();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // This is the textfield data
    const formData = new FormData(e.currentTarget);

    props.updateCategory(props.token, formData);
    // When the Dialog is close then re-initialize type as empty and close Dialog
    onClose();
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    // This is the textfield data
    const formData = new FormData(e.currentTarget);

    props.deleteCategory(props.token, formData.get("idd"));
    // Close dialog after submit and re-initialize the type
    onClose();
  };
  // This delete function is for the WordContent word list delete
  const handleDeleteWordChoice = (e, id) => {
    e.preventDefault();
    // Close dialog after clicking delete and re-initialize the type
    onClose();
    // Pass the id to Category Admin parent component
    props.handleDeleteWordChoice(id);
  };

  const onClose = () => {
    // When the Dialog is close then re-initialize type as empty
    props.setType("");
    // Close the dialog
    setOpen(false);
    // Re-initialize the error messages to empty
    props.freshStateCategory();
  };

  const CancelButton = () => {
    return (
      <Button
        sx={{ mr: 2, mt: 1, mb: 1 }}
        onClick={() => {
          // Close dialog
          setOpen(false);
          // Set type to empty
          props.setType("");
        }}
      >
        Cancel
      </Button>
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth sx={{ mt: -15 }}>
        {props.type === "create" ? (
          <React.Fragment>
            <DialogTitle>Create Category</DialogTitle>
            <Divider />
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  id="name"
                  margin="dense"
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  autoComplete="off"
                  onKeyUp={(e) => {
                    props.validateName(e.target.value);
                  }}
                  helperText={
                    props.categoryNameError === ""
                      ? " "
                      : props.categoryNameError
                  }
                  error={props.categoryNameError === "" ? false : true}
                />

                <TextField
                  id="text"
                  margin="dense"
                  required
                  label="Description"
                  name="description"
                  autoComplete="off"
                  fullWidth
                  multiline
                  rows={3}
                  onKeyUp={(e) => {
                    props.validateDescription(e.target.value);
                  }}
                  helperText={
                    props.categoryDescriptionError === ""
                      ? " "
                      : props.categoryDescriptionError
                  }
                  error={props.categoryDescriptionError === "" ? false : true}
                />
              </DialogContent>
              <Divider />
              <DialogActions>
                <CancelButton />
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ mr: 2, mt: 1, mb: 1 }}
                  disabled={props.isSubmitDisabled ? true : false}
                >
                  Save
                </Button>
              </DialogActions>
            </Box>
          </React.Fragment>
        ) : null}

        {props.type === "edit" ? (
          <React.Fragment>
            <DialogTitle>Edit Category</DialogTitle>
            <Divider />
            <Box component="form" noValidate onSubmit={handleEditSubmit}>
              <DialogContent>
                <TextField
                  id="index_id"
                  name="index_id"
                  defaultValue={props.dialogData.index}
                  sx={{ display: "none" }}
                />
                <TextField
                  id="idd"
                  name="idd"
                  defaultValue={props.dialogData.categoryId}
                  sx={{ display: "none" }}
                />
                <TextField
                  id="name"
                  margin="dense"
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  autoComplete="off"
                  onKeyUp={(e) => {
                    props.validateName(e.target.value);
                  }}
                  helperText={
                    props.categoryNameError === ""
                      ? " "
                      : props.categoryNameError
                  }
                  error={props.categoryNameError === "" ? false : true}
                  defaultValue={props.dialogData.categoryName}
                />

                <TextField
                  id="text"
                  margin="dense"
                  required
                  label="Description"
                  name="description"
                  autoComplete="off"
                  fullWidth
                  multiline
                  rows={3}
                  onKeyUp={(e) => {
                    props.validateDescription(e.target.value);
                  }}
                  helperText={
                    props.categoryDescriptionError === ""
                      ? " "
                      : props.categoryDescriptionError
                  }
                  error={props.categoryDescriptionError === "" ? false : true}
                  defaultValue={props.dialogData.categoryDescription}
                />
              </DialogContent>
              <Divider />
              <DialogActions>
                <CancelButton />
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ mr: 2, mt: 1, mb: 1 }}
                >
                  Update
                </Button>
              </DialogActions>
            </Box>
          </React.Fragment>
        ) : null}

        {props.type === "delete" ? (
          <React.Fragment>
            <DialogTitle>Delete Category</DialogTitle>
            <Divider />
            <Box component="form" noValidate onSubmit={handleDeleteSubmit}>
              <TextField
                id="idd"
                name="idd"
                defaultValue={props.dialogData.categoryId}
                sx={{ display: "none" }}
              />
              <DialogContent>
                <Typography>
                  Are you sure you want to delete{" "}
                  <span style={{ fontWeight: "600" }}>
                    {props.dialogData.categoryName}
                  </span>{" "}
                  category ?
                </Typography>
              </DialogContent>
              <Divider />
              <DialogActions>
                <CancelButton />
                <Button
                  type="submit"
                  variant="outlined"
                  color="error"
                  sx={{ mr: 2, mt: 1, mb: 1 }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Box>
          </React.Fragment>
        ) : null}

        {props.type === "deleteWord" ? (
          <React.Fragment>
            <DialogTitle>Delete Word and Choices</DialogTitle>
            <Divider />
            <Box
              component="form"
              noValidate
              onSubmit={(e) => {
                handleDeleteWordChoice(e, props.dialogData.wordId);
              }}
            >
              <TextField
                id="idd"
                name="idd"
                defaultValue={props.dialogData.wordId}
                sx={{ display: "none" }}
              />
              <DialogContent>
                <Typography>
                  Are you sure you want to delete{" "}
                  <span style={{ fontWeight: "600" }}>
                    {props.dialogData.wordName}
                  </span>{" "}
                  and it's choices ?
                </Typography>
              </DialogContent>
              <Divider />
              <DialogActions>
                <CancelButton />
                <Button
                  type="submit"
                  variant="outlined"
                  color="error"
                  sx={{ mr: 2, mt: 1, mb: 1 }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Box>
          </React.Fragment>
        ) : null}
      </Dialog>
    </div>
  );
};

const mapToStateProps = (state, ownProps) => {
  return {
    token: state.auth.userAuth.token,
    categoryNameError: state.category.categoryNameError,
    isValidCatName: state.category.isValidCatName,
    categoryDescriptionError: state.category.categoryDescriptionError,
    isValidCatDescription: state.category.isValidCatDescription,
    isSubmitDisabled: state.category.isSubmitDisabled,
    requestError: state.category.requestError,
    requestErrorMessage: state.category.requestErrorMessage,
    dialogData: state.category.dialogData,
    type: ownProps.type,
    setType: ownProps.setType,
  };
};

export default connect(mapToStateProps, {
  addCategory,
  updateCategory,
  deleteCategory,
  validateName,
  validateDescription,
  disableSubmit,
  freshStateCategory,
})(CategoryDialog);

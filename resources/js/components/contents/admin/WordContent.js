import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import {
  fetchChoicesWords,
  changeSubmitType,
  addWordChoice,
  removeEditWord,
  removeEditFirstChoice,
  removeEditSecondChoice,
  removeEditThirdChoice,
  removeEditFourthChoice,
  removeEditIsCorrectAnswer,
  editWordChoiceData,
  updateWordChoice,
  deleteWordChoice,
  setWordContentData,
  validateWord,
  validateFirst,
  validateSecond,
  validateThird,
  validateFourth,
  createNewWordChoice,
  freshWordChoice,
} from "../../../actions/word";
import AlertContent from "../subcontents/AlertContent";

const Words = (props) => {
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [selectCorrect, setSelectCorrect] = useState(0);

  useEffect(() => {
    // Get the cookies data
    const wordContentData = props.cookies.get("wordContent");
    // If cookie data is not empty
    if (wordContentData !== "") {
      props.setWordContentData(wordContentData);
      // Fetch the words and choices by categoryId
      props.fetchChoicesWords(props.token, wordContentData.categoryId);
    }
  }, []);
  // Run if there is changes in wordsChoices state
  useEffect(() => {
    // Checks if request error has change then run function
    if (props.requestErrorMessage !== "") {
      // Fetch the words and choices data
      props.fetchChoicesWords(props.token);
    }
  }, [props.requestErrorMessage]);

  useEffect(() => {
    //Checks if the the inputted are not empty.
    // Run if submitType is store
    if (props.submitType === "store") {
      if (
        props.word !== "" &&
        props.firstChoice !== "" &&
        props.secondChoice !== "" &&
        props.thirdChoice !== "" &&
        props.fourthChoice !== ""
      ) {
        setDisabledSubmit(false);
      } else {
        setDisabledSubmit(true);
      }
    } else {
      // Run if submitType is update
      // Check if there is changes to fields
      if (
        props.word !== props.editData.word.name ||
        props.firstChoice !== props.editData.choices[0] ||
        props.secondChoice !== props.editData.choices[1] ||
        props.thirdChoice !== props.editData.choices[2] ||
        props.fourthChoice !== props.editData.choices[3]
      ) {
        setDisabledSubmit(false);
      } else {
        setDisabledSubmit(true);
      }
    }
  }, [
    props.word,
    props.firstChoice,
    props.secondChoice,
    props.thirdChoice,
    props.fourthChoice,
  ]);
  /*
    Run this function if there is changes in wordId from Category Admin.
    When the user clicks the Delete button, CategoryAdminDialog will pass
    the wordId to CategoryAdmin, then wordId is passed as props to this 
    wordContent component. We are doing this so that we can use the Dialog
    component from the CategoryAdminDialog.
  */
  useEffect(() => {
    if (props.wordId !== null) {
      // Pass the token and the wordId
      props.deleteWordChoice(props.token, props.wordId);
      // Set the wordId back to null
      props.setWordId(null);
      // Re-intialize the request errror and message
      props.freshWordChoice();
    }
  }, [props.wordId]);

  const handleBackNavigation = () => {
    // Remove the wordContent cookie on close
    props.cookies.remove("wordContent");
    // Cloce this Word component
    props.setOpenWord(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Check the submitType if store or update
    const submitType = formData.get("submitType");
    if (submitType === "store") {
      // Pass the token and data
      props.addWordChoice(props.token, formData);
      // Re-intialize the request errror and message
      props.freshWordChoice();
    } else {
      // If else then use update function
      // Pass token, the previous edit data, and formData
      props.updateWordChoice(props.token, props.editData, formData);
    }
  };

  const handleEdit = (key) => {
    var data = {};
    var choices = [];
    var isCorrectAnswer = "";
    // Set sumbmitType as update
    props.changeSubmitType("update");
    // Disable the update submit button
    setDisabledSubmit(true);

    Object.entries(props.wordsChoices.data.data).map(([objKey, word]) => {
      if (key === objKey) {
        Object.entries(word.choices).map(([key, choice]) => {
          choices.push(choice.name);
          //Assign value to isCorrectAnswer
          if (choice.is_correct_answer === 1) {
            isCorrectAnswer = key;
          }
        });
        data = {
          word,
          choices,
          isCorrectAnswer,
        };
      }
    });
    props.editWordChoiceData(data);
  };

  return (
    <React.Fragment>
      <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
        <Grid container>
          <Grid item lg={2} md={2} sm={4} xs={6}>
            <Typography variant="h6" sx={{ m: 3 }}>
              Add Words
            </Typography>
          </Grid>
          <Grid item lg={10} md={10} sm={8} xs={6}>
            <Button
              sx={{ float: "right", mt: 2, mr: 2 }}
              onClick={handleBackNavigation}
            >
              Go Back
            </Button>
          </Grid>
        </Grid>
        <Divider />
        {props.wordContentData != null ? (
          <React.Fragment>
            <Grid container sx={{ mt: 2, ml: 3 }}>
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                  }}
                >
                  {props.wordContentData.categoryName}
                </Typography>
              </Grid>
              <Grid item lg={8} md={8} sm={8} xs={12}>
                {props.requestErrorMessage !== "" ? (
                  <AlertContent
                    isError={props.requestError}
                    message={props.requestErrorMessage}
                  />
                ) : null}
              </Grid>
            </Grid>
            <Container component="form" noValidate onSubmit={handleSubmit}>
              <Grid container sx={{ mt: 5, mb: 5 }} spacing={3}>
                <TextField
                  sx={{ display: "none" }}
                  id="submitType"
                  name="submitType"
                  value={props.submitType}
                />
                <TextField
                  sx={{ display: "none" }}
                  id="wordId"
                  name="wordId"
                  value={
                    props.editData.length !== 0 ? props.editData.word.id : ""
                  }
                />
                <Grid item md={4} lg={4}>
                  <Typography>Word</Typography>
                  <TextField
                    id="word"
                    name="word"
                    size="small"
                    fullWidth
                    sx={{ mt: 1 }}
                    value={
                      props.editDataWord.length === 0
                        ? props.word
                        : props.editDataWord.name
                    }
                    error={props.wordError === "" ? false : true}
                    helperText={props.wordError !== "" ? props.wordError : " "}
                    onChange={(e) => {
                      // We need to re-initialize the word in order for the field to be edited
                      props.removeEditWord();
                      props.validateWord(e.target.value);
                    }}
                  />
                  <Grid container sx={{ mt: 2 }}>
                    <Grid item md={12}>
                      <Typography>Choice</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="firstChoice"
                        name="firstChoice"
                        fullWidth
                        size="small"
                        sx={{ mt: 1 }}
                        value={
                          props.editDataFirstChoice === ""
                            ? props.firstChoice
                            : props.editDataFirstChoice
                        }
                        error={props.firstChoiceError === "" ? false : true}
                        helperText={
                          props.firstChoiceError !== ""
                            ? props.firstChoiceError
                            : " "
                        }
                        onChange={(e) => {
                          // We need to re-initialize the choice one in order for the field to be edited
                          props.removeEditFirstChoice();
                          props.validateFirst(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="secondChoice"
                        name="secondChoice"
                        fullWidth
                        size="small"
                        sx={{ mt: 1 }}
                        value={
                          props.editDataSecondChoice === ""
                            ? props.secondChoice
                            : props.editDataSecondChoice
                        }
                        error={props.secondChoiceError === "" ? false : true}
                        helperText={
                          props.secondChoiceError !== ""
                            ? props.secondChoiceError
                            : " "
                        }
                        onChange={(e) => {
                          // We need to re-initialize the choice one in order for the field to be edited
                          props.removeEditSecondChoice();
                          props.validateSecond(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="thirdChoice"
                        name="thirdChoice"
                        fullWidth
                        size="small"
                        sx={{ mt: 1 }}
                        value={
                          props.editDataThirdChoice === ""
                            ? props.thirdChoice
                            : props.editDataThirdChoice
                        }
                        error={props.thirdChoiceError === "" ? false : true}
                        helperText={
                          props.thirdChoiceError !== ""
                            ? props.thirdChoiceError
                            : " "
                        }
                        onChange={(e) => {
                          // We need to re-initialize the choice one in order for the field to be edited
                          props.removeEditThirdChoice();
                          props.validateThird(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="fourthChoice"
                        name="fourthChoice"
                        fullWidth
                        size="small"
                        sx={{ mt: 1 }}
                        value={
                          props.editDataFourthChoice === ""
                            ? props.fourthChoice
                            : props.editDataFourthChoice
                        }
                        error={props.fourthChoiceError === "" ? false : true}
                        helperText={
                          props.fourthChoiceError !== ""
                            ? props.fourthChoiceError
                            : " "
                        }
                        onChange={(e) => {
                          // We need to re-initialize the choice one in order for the field to be edited
                          props.removeEditFourthChoice();
                          props.validateFourth(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item md={12}>
                      <Typography>Select correct choice</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Select
                        id="correctAnswer"
                        name="correctAnswer"
                        value={
                          props.editDataIsCorrectAnswer === ""
                            ? selectCorrect
                            : props.editDataIsCorrectAnswer
                        }
                        fullWidth
                        size="small"
                        sx={{ mt: 2 }}
                        onChange={(e) => {
                          // We need to re-initialize the isCorrectAnswer
                          props.removeEditIsCorrectAnswer();
                          setSelectCorrect(e.target.value);
                        }}
                      >
                        <MenuItem value="0">First choice</MenuItem>
                        <MenuItem value="1">Second choice</MenuItem>
                        <MenuItem value="2">Third Choice</MenuItem>
                        <MenuItem value="3">Fourth Choice</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 5 }}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      {props.submitType === "store" ? (
                        <Grid container sx={{ mt: 4 }}>
                          <Grid item lg={6} md={6} sm={6} xs={6}></Grid>
                          <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Button
                              disabled={disabledSubmit}
                              variant="outlined"
                              type="submit"
                              sx={{
                                float: "right",
                              }}
                            >
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                      ) : null}
                      {props.submitType === "update" ? (
                        <Grid container sx={{ mt: 4 }}>
                          <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Button
                              variant="text"
                              type="button"
                              onClick={() => {
                                props.createNewWordChoice();
                                // Change sumbitType to store
                                props.changeSubmitType("store");
                              }}
                            >
                              Create New
                            </Button>
                          </Grid>
                          <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Button
                              disabled={disabledSubmit}
                              variant="outlined"
                              type="submit"
                              sx={{
                                float: "right",
                              }}
                            >
                              Update
                            </Button>
                          </Grid>
                        </Grid>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={8} lg={8}>
                  <Paper sx={{ ml: 5 }}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontSize: "15px" }}>
                              Word
                            </TableCell>
                            <TableCell sx={{ fontSize: "15px" }}>
                              Choices
                            </TableCell>
                            <TableCell sx={{ fontSize: "15px" }}>
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {props.wordsChoices.length !== 0
                            ? Object.entries(props.wordsChoices.data.data).map(
                                ([key, word]) => (
                                  <TableRow
                                    key={key}
                                    style={
                                      key % 2
                                        ? {
                                            background: "#F2F2F2",
                                          }
                                        : {
                                            background: "white",
                                          }
                                    }
                                  >
                                    <TableCell>{word.name}</TableCell>
                                    <TableCell>
                                      {Object.entries(word.choices).map(
                                        ([key2, choice]) => (
                                          <span key={key2}>
                                            {choice.name} {" | "}
                                          </span>
                                        )
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      <Grid container spacing={2}>
                                        <Grid item>
                                          <Tooltip title="Edit Word and Choices">
                                            <Button
                                              variant="outlined"
                                              sx={{
                                                minWidth: "30px",
                                                minHeight: "30px",
                                              }}
                                              size="small"
                                              onClick={() => {
                                                handleEdit(key);
                                              }}
                                            >
                                              <Edit
                                                sx={{
                                                  fontSize: "20px",
                                                }}
                                              ></Edit>
                                            </Button>
                                          </Tooltip>
                                        </Grid>
                                        <Grid item>
                                          <Tooltip title="Delete Word and Choices">
                                            <Button
                                              variant="outlined"
                                              sx={{
                                                minWidth: "30px",
                                                minHeight: "30px",
                                              }}
                                              size="small"
                                              onClick={() => {
                                                // Call this function from categoryAdmin
                                                props.handleDialog(
                                                  "deleteWord",
                                                  {
                                                    index: key,
                                                    wordId: word.id,
                                                    wordName: word.name,
                                                  }
                                                );
                                              }}
                                            >
                                              <Delete
                                                sx={{
                                                  fontSize: "20px",
                                                  color: "red",
                                                }}
                                              ></Delete>
                                            </Button>
                                          </Tooltip>
                                        </Grid>
                                      </Grid>
                                    </TableCell>
                                  </TableRow>
                                )
                              )
                            : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </React.Fragment>
        ) : (
          // Displays error when there is no category data
          <Box sx={{ m: 10 }}>
            <Typography style={{ textAlign: "center", p: 10 }}>
              Can't Process data... Please Try Again
            </Typography>
          </Box>
        )}
      </Paper>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.auth.userAuth.token,
    submitType: state.word.submitType,
    editData: state.word.editData,
    editDataWord: state.word.editDataWord,
    editDataFirstChoice: state.word.editDataFirstChoice,
    editDataSecondChoice: state.word.editDataSecondChoice,
    editDataThirdChoice: state.word.editDataThirdChoice,
    editDataFourthChoice: state.word.editDataFourthChoice,
    editDataIsCorrectAnswer: state.word.editDataIsCorrectAnswer,
    word: state.word.word,
    firstChoice: state.word.firstChoice,
    secondChoice: state.word.secondChoice,
    thirdChoice: state.word.thirdChoice,
    fourthChoice: state.word.fourthChoice,
    wordsChoices: state.word.wordsChoices,
    wordContentData: state.word.wordContentData,
    wordError: state.word.wordError,
    firstChoiceError: state.word.firstChoiceError,
    secondChoiceError: state.word.secondChoiceError,
    thirdChoiceError: state.word.thirdChoiceError,
    fourthChoiceError: state.word.fourthChoiceError,
    isValidWord: state.word.isValidWord,
    isValidFirstChoice: state.word.isValidFirstChoice,
    isValidSecondChoice: state.word.isValidSecondChoice,
    isValidThirdChoice: state.word.isValidThirdChoice,
    isValidFourthChoice: state.word.isValidFourthChoice,
    requestError: state.word.requestError,
    requestErrorMessage: state.word.requestErrorMessage,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapStateToProps, {
    fetchChoicesWords,
    changeSubmitType,
    addWordChoice,
    removeEditWord,
    removeEditFirstChoice,
    removeEditSecondChoice,
    removeEditThirdChoice,
    removeEditFourthChoice,
    removeEditIsCorrectAnswer,
    editWordChoiceData,
    updateWordChoice,
    deleteWordChoice,
    setWordContentData,
    validateWord,
    validateFirst,
    validateSecond,
    validateThird,
    validateFourth,
    createNewWordChoice,
    freshWordChoice,
  })(Words)
);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import { fetchChoicesWords } from "../../actions/word";
import {
  setLessonData,
  setCategoryUserId,
  storeCategoryUser,
  checkCategoryUser,
  storeAnswerUser,
  setAnswerData,
} from "../../actions/lesson";
import ProgressBar from "./ProgressBar";
import LessonResult from "./LessonResult";

const LessonAnswer = (props) => {
  const [activeWord, setActiveWord] = useState(1);
  const [selectedBtn, setSelectedBtn] = useState("");
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [openResult, setOpenResult] = useState(false);
  const [submitName, setSubmitName] = useState("Next");
  // Get activeLesson cookie data
  const activeLesson = props.cookies.get("activeLesson");
  // Get categoryUserId cookie data
  const categoryUserId = props.cookies.get("categoryUserId");
  // Get cookie value
  const active = props.cookies.get("activeWord");
  // Run on first load
  useEffect(() => {
    if (activeLesson !== undefined) {
      // Update state with cookie values
      props.setLessonData(activeLesson);
      /**
       * We need to check if category_user has already data for the
       * specific category id and user id. If exists then update the
       * categoryUserId. This is important so that if category_user
       * does not exist then it will store a new data to category_user
       * with category_id and user_id
       */
      props.checkCategoryUser(props.token, {
        user_id: props.userId,
        category_id: activeLesson.categoryId,
      });
      /**
       * This function gets all the words and choices based on the
       * the category id
       */
      props.fetchChoicesWords(props.token, activeLesson.categoryId);
    }

    /**
     * Assign the word if exist in cookie
     * activeWord state helps in determining what position
     * of the word the user will answer
     */
    if (active !== undefined) {
      setActiveWord(parseInt(active));
    }
    // Get cookie value
    const answerLength = props.cookies.get("answerLength");
    /**
     * Assign the word if exist in cookie
     * answerLength will have a value if the user has answered all
     * the words. This will help for redirecting into a specific word
     * to answer if user has already started answering.
     *
     */
    if (answerLength !== undefined) {
      setActiveWord(parseInt(answerLength));
    }
    /**
     * We check if category_user has data of a category id and user
     * id, if exists then the categoryUserId cookie will be set if
     * no data then assigns undefined.
     */
    if (categoryUserId !== "") {
      props.setCategoryUserId(categoryUserId);
    }
  }, []);
  // Run this if categoryUserId changes
  useEffect(() => {
    if (
      props.categoryUserId !== undefined &&
      props.categoryUserId !== null &&
      props.categoryUserId !== ""
    ) {
      // Set cookie with updated state
      props.cookies.set("categoryUserId", props.categoryUserId, {
        path: "/",
      });
      /**
       * Check if answerData has value
       */
      if (props.answerData !== null) {
        /**
         * Run on first submit
         * On first submit the category_user has no data for this
         * specific category id and user id so we need to check
         * if undefined category_user_id.
         */
        if (props.answerData.category_user_id === "") {
          props.storeAnswerUser(props.token, {
            category_user_id: props.categoryUserId,
            word_id: props.answerData.word_id,
            choice_id: props.answerData.choice_id,
          });
        }
      }
    }
  }, [props.categoryUserId]);
  //Run if answerLength changes
  useEffect(() => {
    /**
     * The props.answerLength only has value if the user
     * has answered a word. We need to check first if
     * props.answerLength value is greater than 0
     */
    if (props.answerLength > 0) {
      setActiveWord(props.answerLength + 1);
    }
  }, [props.answerLength]);
  // Run if words choices changes and if activeWord state changes
  useEffect(() => {
    // If props.wordsChoices has been initialized
    if (props.wordsChoices.length !== 0) {
      /**
       * We only need the data of words and choices. We first
       * check if has data.
       */
      if (props.wordsChoices.data !== 0) {
        /**
         * If activeWord (the position of the word to be answered) then
         * go to result page.
         */
        if (activeWord > props.wordsChoices.data.data.length) {
          // Open result
          setOpenResult(true);
          // Set title to Result
          props.setTitle("Results");
        }
        /**
         * When the user has answered the previous words and choices
         * and the user is in the last words and choices, the submit
         * button title will be "See Results".
         */
        if (parseInt(active) === props.wordsChoices.data.data.length - 1) {
          setSubmitName("See Results");
        } else {
          // Default title of submit
          setSubmitName("Next");
        }
      }
    }
  }, [props.wordsChoices, activeWord]);
  // This runs if user clicks on choice button
  const handleSelectedBtn = (key, data) => {
    // This will help in highlighting the button
    setSelectedBtn(key);
    // Assign value to answerData state
    props.setAnswerData(data);
    // Enable the submit button
    setDisabledSubmit(false);
  };
  // This runs if user clicks on submit
  const handleSubmit = () => {
    /**
     * This function runs if the user first clicks the start and
     * starts a new category without data in category_user and
     * answer_user data.
     */
    if (props.answerLength === 0 && categoryUserId === undefined) {
      props.storeCategoryUser(props.token, {
        user_id: props.userId,
        category_id: props.lessonData.categoryId,
        completed: 0,
      });
    } else {
      /**
       * This will store answer data on second, third submit and so on.
       * pass answer data as second arguemnt.
       */
      props.storeAnswerUser(props.token, props.answerData);
    }
    // Disable submit button
    setDisabledSubmit(true);
    // Remove highlight of choice button
    setSelectedBtn("");
    // Assign new value to activeWord. Increment one to go to next word to answer
    setActiveWord(activeWord + 1);
    // Set new value to the cookie
    props.cookies.set("activeWord", activeWord, { path: "/" });
  };

  return (
    <Container>
      <Paper>
        {openResult === false ? (
          <React.Fragment>
            <Grid container>
              <Grid item lg={2} md={2} sm={4} xs={6}>
                <Typography
                  variant="h6"
                  sx={{ m: 3, textTransform: "capitalize" }}
                >
                  {props.lessonData.categoryName}
                </Typography>
              </Grid>
              <Grid item lg={10} md={10} sm={8} xs={6}>
                <Typography
                  variant="h1"
                  textAlign="right"
                  sx={{ fontSize: "18px", mt: 4, mr: 4, mb: 0 }}
                >
                  {/* We need to add 1 to activeWord because the first index value is zero  */}
                  {activeWord} of{" "}
                  {props.wordsChoices.length !== 0
                    ? props.wordsChoices.data.data.length
                    : null}
                </Typography>
              </Grid>
            </Grid>
            <ProgressBar
              index={activeWord === 0 ? 0 : activeWord}
              length={
                props.wordsChoices.length !== 0
                  ? props.wordsChoices.data.data.length
                  : 100
              }
            />
            {props.wordsChoices.length !== 0
              ? Object.entries(props.wordsChoices.data.data).map(
                  ([key, word]) => {
                    if (key === (activeWord - 1).toString()) {
                      return (
                        <Grid
                          container
                          key={key}
                          sx={{ p: 5, mt: 5 }}
                          justifyContent="space-between"
                        >
                          <Grid item lg={6} md={6} sm={6} xs={12}>
                            <Paper sx={{ pt: 4, pl: 5, pr: 5, pb: 3 }}>
                              <Typography
                                variant="h1"
                                textAlign="center"
                                sx={{ fontSize: "45px", mt: 5, mb: 5 }}
                              >
                                {word.name}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item lg={4} md={4} sm={4} xs={12}>
                            <Grid container spacing={2}>
                              {Object.entries(word.choices).map(
                                ([key2, choice]) => (
                                  <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                    key={key2}
                                  >
                                    <Button
                                      variant={
                                        key2 === selectedBtn
                                          ? "contained"
                                          : "outlined"
                                      }
                                      size="small"
                                      fullWidth
                                      sx={{ fontSize: "16px" }}
                                      value={choice.id}
                                      onClick={() => {
                                        handleSelectedBtn(key2, {
                                          // Name should be the same as the db column name
                                          category_user_id:
                                            props.categoryUserId,
                                          word_id: word.id,
                                          choice_id: choice.id,
                                        });
                                      }}
                                    >
                                      {choice.name}
                                    </Button>
                                  </Grid>
                                )
                              )}
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Divider sx={{ mt: 5, mb: 7 }} />
                                <Button
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  sx={{ fontSize: "16px" }}
                                  disabled={disabledSubmit}
                                  onClick={() => {
                                    handleSubmit();
                                  }}
                                >
                                  {submitName}
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    }
                  }
                )
              : null}
          </React.Fragment>
        ) : null}

        {openResult ? <LessonResult /> : null}
      </Paper>
    </Container>
  );
};

const mapToStateProps = (state, ownProps) => {
  return {
    userId: state.auth.userAuth.id,
    token: state.auth.userAuth.token,
    wordsChoices: state.word.wordsChoices,
    categoryUserId: state.lesson.categoryUserId,
    lessonData: state.lesson.lessonData,
    answerData: state.lesson.answerData,
    answerLength: state.lesson.answerLength,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapToStateProps, {
    fetchChoicesWords,
    setLessonData,
    setCategoryUserId,
    storeCategoryUser,
    checkCategoryUser,
    setAnswerData,
    storeAnswerUser,
  })(LessonAnswer)
);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import {
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

import { fetchChoicesWords } from "../../actions/word";
import { setLessonData, setAnswerData } from "../../actions/lesson";
import LessonResult from "./LessonResult";

const LessonAnswer = (props) => {
  const [activeWord, setActiveWord] = useState(0);
  const [selectedBtn, setSelectedBtn] = useState("");
  const [progress, setProgress] = useState(0);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [openResult, setOpenResult] = useState(false);

  useEffect(() => {
    const activeLesson = props.cookies.get("activeLesson");
    // Get lesson data from cookie
    if (activeLesson !== undefined) {
      props.setLessonData(activeLesson);
    }

    /**
     * We need to get the data from cookies to get the current progress of
     * Word and Choices
     */
    const active = props.cookies.get("activeWord");
    if (active !== undefined) {
      setActiveWord(parseInt(active));
    }
  }, []);
  // If lesson data changes then run this function
  useEffect(() => {
    if (props.lessonData !== "") {
      // Fetch word and choices based on the category id
      props.fetchChoicesWords(props.token, props.lessonData.categoryId);
    }
  }, [props.lessonData]);

  const calculateProgress = (activeWord, length) => {
    const percentage = 100 / length;
    // We need to add a to activeWord because the first index value is 0
    const current = percentage * (activeWord + 1);
    return current;
  };

  // If activeWord changes, this will run
  useEffect(() => {
    if (props.wordsChoices.length !== 0) {
      // Get update activeWord data from cookies
      const active = props.cookies.get("activeWord");
      // Check if beyond the word length, if beyond then open the result page
      if (props.wordsChoices.data !== 0) {
        if (active >= props.wordsChoices.data.data.length) {
          setOpenResult(true);
        } else {
          // Pass the activeWord to be calculated
          setProgress(
            calculateProgress(activeWord, props.wordsChoices.data.data.length)
          );
        }
      }
    }
  }, [props.wordsChoices, activeWord]);
  // If answerData changes, this will run
  useEffect(() => {
    if (props.answerData !== "") {
      // We need to put the answerData in a cookie so on reload it can be retrieve
      props.cookies.set("answerData", props.answerData, { path: "/" });
    }
  }, [props.answerData]);

  const handleSelectedBtn = (e, key) => {
    setSelectedBtn({
      key: key,
      value: e.target.value,
    });
    // Enable submit button
    setDisabledSubmit(false);
  };

  const handleSubmit = () => {
    // Disable button
    setDisabledSubmit(true);
    // Set selectedBtn to undefined
    setSelectedBtn("");
    // Get current activeWord
    const active = activeWord;
    // Need to add 1 to activeWord because the first index is zero
    setActiveWord(active + 1);
    // Add the activeWord to cookie so on reload we can retrieve the data
    props.cookies.set("activeWord", active + 1, { path: "/" });
    // Assign data to answerData state
    props.setAnswerData(selectedBtn.value);
  };

  return (
    <Container>
      <Paper>
        {openResult === false ? (
          <React.Fragment>
            <Grid container>
              <Grid item lg={2} md={2} sm={4} xs={6}>
                <Typography variant="h6" sx={{ m: 3 }}>
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
                  {activeWord + 1} of{" "}
                  {props.wordsChoices.length !== 0
                    ? props.wordsChoices.data.data.length
                    : null}
                </Typography>
              </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={progress} />
            {props.wordsChoices.length !== 0
              ? Object.entries(props.wordsChoices.data.data).map(
                  ([key, word]) => {
                    if (key === activeWord.toString()) {
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
                                        key2 === selectedBtn.key
                                          ? "contained"
                                          : "outlined"
                                      }
                                      size="small"
                                      fullWidth
                                      sx={{ fontSize: "16px" }}
                                      value={choice.id}
                                      onClick={(e) => {
                                        handleSelectedBtn(e, key2);
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
                                  Submit
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
    token: state.auth.userAuth.token,
    wordsChoices: state.word.wordsChoices,
    lessonData: state.lesson.lessonData,
    answerData: state.lesson.answerData,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapToStateProps, { fetchChoicesWords, setLessonData, setAnswerData })(
    LessonAnswer
  )
);

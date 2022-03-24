import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

import { fetchAnswerUserData, setScore } from "../../actions/lesson";
import { fetchSingleCategory } from "../../actions/category";

const LessonResult = (props) => {
  const [words, setWords] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  // Get cookie data
  const lessonData = props.cookies.get("activeLesson");

  useEffect(() => {
    if (lessonData !== undefined) {
      props.fetchAnswerUserData(props.token, {
        user_id: props.userId,
        category_user_id: lessonData.categoryId,
      });
      // Get category based on id
      props.fetchSingleCategory(props.token, lessonData.categoryId);
    }
  }, []);

  useEffect(() => {
    if (props.category.length !== 0) {
      /**
       * The category state consists of words and choices. We need to
       * extract the words and choices and ignore the parent category
       * details. Then we will update the state of words.
       */
      Object.entries(props.category).map(([key, category]) => {
        // Set words with data
        setWords(category.words);
      });
    }

    const newTimer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    clearTimeout(() => {
      newTimer;
    });
  }, [props.category]);

  const renderResult = () => {
    var score = 0;

    if (props.answer_results.length !== 0 && props.category.length !== 0) {
      return Object.entries(props.answer_results).map(([key1, answer]) => {
        return words
          .filter((data1) => data1.word_id === answer.word_id)
          .map((word) =>
            word.choices
              .filter((choice) => choice.choice_id === answer.choice_id)
              .map((data2) => {
                // Add 1 to score if true
                isCorrect(answer.is_correct) ? ++score : null;
                // Handle score if last rendered key
                const timer = setTimeout(() => {
                  props.setScore(score);
                  setProgress(calculateProgress(score));
                }, 1000);
                clearTimeout(() => {
                  timer;
                });
                return (
                  <React.Fragment key={data2.choice_id}>
                    <Grid item lg={5} md={5} sm={5} xs={5}>
                      <Typography sx={{ ml: 3 }}>{word.name}</Typography>
                    </Grid>
                    <Grid item lg={5} md={5} sm={5} xs={5}>
                      <Typography>{data2.name}</Typography>
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                      <Typography>
                        {isCorrect(data2.is_correct_answer) ? (
                          <CheckCircle
                            sx={{ color: "green", fontSize: "30px" }}
                          />
                        ) : (
                          <Cancel sx={{ color: "red", fontSize: "30px" }} />
                        )}
                      </Typography>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Divider />
                    </Grid>
                  </React.Fragment>
                );
              })
          );
      });
    }
  };
  // Returns if answer is correct
  const isCorrect = (answer) => {
    return answer === 1 ? true : false;
  };
  // This will return a text if score state has been initialized
  const renderScoreText = () => {
    if (props.score > 0 && props.answer_results.length !== 0) {
      // Return score
      return props.score + " / " + props.answer_results.length;
    } else {
      // Return loading text
      return "0 / 0";
    }
  };
  // Calculate progress for CircularProgress
  const calculateProgress = (score) => {
    const percentage = 100 / words.length;
    return percentage * score;
  };

  return (
    <React.Fragment>
      {!loading ? (
        <Box sx={{ p: 5 }}>
          <Grid container>
            <Grid item lg={10} md={10} sm={10} xs={10}>
              <Typography
                variant="h6"
                sx={{ m: 3 }}
                style={{ textTransform: "capitalize", fontWeight: "900" }}
              >
                {lessonData !== undefined ? lessonData.categoryName : null}
              </Typography>
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
              <Box
                sx={{ position: "relative", display: "inline-flex" }}
                style={{ marginLeft: "-20px" }}
              >
                <CircularProgress
                  variant="determinate"
                  value={progress}
                  style={{
                    height: "120px",
                    width: "120px",
                    color: "#1976D2",
                    borderRadius: "100%",
                    boxShadow: "inset 0 0 0px 11px #1976D266",
                    backgroundColor: "transparent",
                  }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    style={{ fontSize: "18px" }}
                  >
                    {renderScoreText()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "50px" }}>
            <Grid item lg={5} md={5} sm={5} xs={5}>
              <Typography
                variant="h6"
                sx={{ m: 3 }}
                style={{
                  textTransform: "capitalize",
                  fontWeight: "800",
                  fontSize: "17px",
                }}
              >
                Word
              </Typography>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={5}>
              <Typography
                variant="h6"
                sx={{ m: 3 }}
                style={{
                  textTransform: "capitalize",
                  fontWeight: "800",
                  fontSize: "17px",
                  marginLeft: "10px",
                }}
              >
                Answer
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4} style={{ marginTop: "20px" }}>
            {renderResult()}
          </Grid>
        </Box>
      ) : (
        <Box
          justifyContent="center"
          alignContent="center"
          sx={{ m: "auto", p: "auto" }}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CircularProgress
                style={{
                  height: "120px",
                  width: "120px",
                  color: "#1976D2",
                  borderRadius: "100%",
                  boxShadow: "inset 0 0 0px 11px #1976D266",
                  backgroundColor: "transparent",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </React.Fragment>
  );
};

const mapToStateProps = (state, ownProps) => {
  return {
    token: state.auth.userAuth.token,
    userId: state.auth.userAuth.id,
    category: state.category.category,
    answer_results: state.lesson.answer_results,
    score: state.lesson.score,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapToStateProps, {
    fetchAnswerUserData,
    fetchSingleCategory,
    setScore,
  })(LessonResult)
);

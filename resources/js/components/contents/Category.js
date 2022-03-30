import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import {
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";

import { fetchAllCategories } from "../../actions/category";
import { freshLesson, fetchAllAnswers } from "../../actions/lesson";
import ProgressBar from "./ProgressBar";
import LessonAnswer from "./LessonAnswer";
import { findLastKey } from "lodash";

const Category = (props) => {
  const [openLesson, setOpenLesson] = useState(false);
  const [title, setTitle] = useState("Categories");
  // This is for rendering data after rendering the category user data
  var lastData = [];
  var completedData = [];
  useEffect(() => {
    // Check if activeLesson is true then open lesson page on reload
    const activeLesson = props.cookies.get("activeLesson");
    if (activeLesson !== undefined) {
      setOpenLesson(true);
    }
    if (activeLesson === undefined) {
      // Fetch data if activeLesson cookie does not exist
      props.fetchAllCategories(props.userAuth.token);
      // Fetch all answer data based on the user_id
      props.fetchAllAnswers(props.userAuth.token, props.userAuth.id);
    }
  }, []);

  // Run this if openLesson state changes
  useEffect(() => {
    // Set the title if openLesson is true
    if (openLesson === true) {
      setTitle("Lesson");
    } else {
      setTitle("Categories");
    }
  }, [openLesson]);

  const formatText = (text) => {
    // Limit the text length of description
    if (text.length < 130) {
      return text;
    } else {
      // Add a hoverable tooltip for full description
      return (
        <React.Fragment>
          <Typography sx={{ fontSize: "15px" }}>
            {text.substring(0, 130)}
            <Tooltip title={text}>
              <Button
                size="small"
                color="primary"
                sx={{
                  ml: -3,
                  width: "1px",
                  maxWidth: "5px",
                  maxHeight: "20px",
                  cursor: "default",
                  fontSize: "15px",
                  fontWeight: "900",
                  backgroundColor: "#FFFFFF00",
                  "&:hover": {
                    backgroundColor: "#FFFFFF00",
                  },
                }}
              >
                ...
              </Button>
            </Tooltip>
          </Typography>
        </React.Fragment>
      );
    }
  };

  const handleStart = (data) => {
    /**
     * Set the cookie so that the Lesson Answer Page, once started,
     * will be opened on site reload.
     */
    props.cookies.set("activeLesson", data, { path: "/" });

    // Handle the opening and closing of lesson page
    setOpenLesson(true);
  };

  const handleBackNavigation = () => {
    // We need to update category lists
    props.fetchAllCategories(props.userAuth.token);
    // We need to update all answer data based on the user_id
    props.fetchAllAnswers(props.userAuth.token, props.userAuth.id);
    // Close lesson page
    setOpenLesson(false);
    // Remove active lesson cookie
    props.cookies.remove("activeLesson");
    /**
     * Remove the active word cookie, answered data, and categoryUserId.
     * We also need to remove answerLength cookie
     */
    props.cookies.remove("activeWord");
    props.cookies.remove("answerData");
    props.cookies.remove("categoryUserId");
    props.cookies.remove("answerLength");
    // Re-initialize the lesson page state data
    props.freshLesson();
  };
  // Check if greater than zero or not equal to zero
  const isValidLength = (answer) => {
    return answer.length !== 0 ? true : false;
  };

  return (
    <React.Fragment>
      <Container>
        <Grid container sx={{ mb: 5 }}>
          <Grid item lg={2} md={2} sm={6} xs={6}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            lg={10}
            md={10}
            sm={6}
            xs={6}
            justifyContent="flex-end"
            textAlign="right"
          >
            {openLesson ? (
              <Button
                size="small"
                sx={{ fontSize: "16px", right: 3 }}
                onClick={handleBackNavigation}
              >
                Go Back
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Container>
      {!openLesson ? (
        <Grid container spacing={3}>
          {props.categories.length !== 0 ? (
            Object.entries(props.categories).map(([key, category]) => {
              // Display only categories with words and ignore categories without words
              if (category.id !== null) {
                /**
                 * We first need to check has answers, if has answers then
                 * get the data and assign to varible.
                 */
                const ans = isValidLength(props.allAnswers)
                  ? props.allAnswers
                      .filter((answer) => answer.category_id === category.id)
                      .map((item) => {
                        return {
                          categoryId: item.category_id,
                          categoryCompleted: item.completed,
                          answerLength: item.answer_users,
                        };
                      })
                  : [];
                var newAns = [];
                if (isValidLength(ans)) {
                  // We need to get the first index of the object ans
                  newAns = ans[Object.keys(ans)[0]];
                }
                if (
                  category.id === newAns.categoryId &&
                  newAns.categoryCompleted === 0
                ) {
                  return (
                    <Grid
                      key={key}
                      item
                      lg={4}
                      md={4}
                      sm={6}
                      xs={6}
                      sx={{ pb: 5 }}
                    >
                      <Card
                        sx={{
                          minHeight: "220px",
                          maxHeight: "220px",
                          border: `${
                            // Check if has answer
                            isValidLength(ans)
                              ? // Check if has answered all
                                newAns.answerLength.length ===
                                category.words.length
                                ? "1px solid #1976D2"
                                : ""
                              : ""
                          }`,
                        }}
                      >
                        {
                          /**
                           * We need to check if category has been answered, if has
                           * been answered then show progress bar. Check if ans has
                           * value.
                           */
                          isValidLength(ans) ? (
                            isValidLength(newAns.answerLength) ? (
                              <ProgressBar
                                sx={{ mt: -2 }}
                                index={newAns.answerLength.length}
                                length={category.words.length}
                              />
                            ) : null
                          ) : null
                        }
                        <CardContent sx={{ p: 3, height: "155px" }}>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              textTransform: "capitalize",
                            }}
                          >
                            {category.name}
                          </Typography>
                          <br />
                          {formatText(category.description)}
                        </CardContent>
                        <CardActions>
                          <Grid container justifyContent="flex-end">
                            <Button
                              variant={
                                isValidLength(ans) ? "contained" : "outlined"
                              }
                              size="small"
                              style={{ bottom: -5, right: 10 }}
                              onClick={() => {
                                handleStart({
                                  categoryId: category.id,
                                  categoryName: category.name,
                                  categoryDescription: category.description,
                                });
                              }}
                            >
                              {isValidLength(ans)
                                ? // Check if has answered all
                                  newAns.answerLength.length ===
                                  category.words.length
                                  ? "View Result"
                                  : "Continue"
                                : "Start"}
                            </Button>
                          </Grid>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                } else if (
                  category.id === newAns.categoryId &&
                  newAns.categoryCompleted === 1
                ) {
                  completedData.push(category);
                } else {
                  lastData.push(category);
                }
                /**
                 * Render last data after mapping all of the category data.
                 * We need to check if the key is the last key. If it is the
                 * last key then run mapping function.
                 */
                if (props.categories.length - 1 === parseInt(key)) {
                  // Combine the two arrays
                  const finalData = completedData.concat(lastData);
                  // Get length of completed data
                  const completeLength = completedData.length;
                  return Object.entries(finalData).map(([lastKey, data]) => {
                    // If data within the completed data then make complete design card
                    if (lastKey < completeLength) {
                      return (
                        <Grid
                          key={lastKey}
                          item
                          lg={4}
                          md={4}
                          sm={6}
                          xs={6}
                          sx={{ pb: 5 }}
                        >
                          <Card
                            sx={{
                              minHeight: "220px",
                              maxHeight: "220px",
                              border: "1px solid #1976D2",
                            }}
                          >
                            <ProgressBar
                              sx={{ mt: -2 }}
                              index={data.words.length}
                              length={data.words.length}
                            />
                            <CardContent sx={{ p: 3, height: "155px" }}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  textTransform: "capitalize",
                                }}
                              >
                                {data.name}
                              </Typography>
                              <br />
                              {formatText(data.description)}
                            </CardContent>
                            <CardActions>
                              <Grid container justifyContent="flex-end">
                                <Button
                                  variant="contained"
                                  size="small"
                                  style={{ bottom: -5, right: 10 }}
                                  onClick={() => {
                                    handleStart({
                                      categoryId: data.id,
                                      categoryName: data.name,
                                      categoryDescription: data.description,
                                    });
                                  }}
                                >
                                  View Result
                                </Button>
                              </Grid>
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    } else {
                      return (
                        <Grid
                          key={lastKey}
                          item
                          lg={4}
                          md={4}
                          sm={6}
                          xs={6}
                          sx={{ pb: 5 }}
                        >
                          <Card
                            sx={{
                              minHeight: "220px",
                              maxHeight: "220px",
                            }}
                          >
                            <CardContent sx={{ p: 3, height: "155px" }}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  textTransform: "capitalize",
                                }}
                              >
                                {data.name}
                              </Typography>
                              <br />
                              {formatText(data.description)}
                            </CardContent>
                            <CardActions>
                              <Grid container justifyContent="flex-end">
                                <Button
                                  variant="outlined"
                                  size="small"
                                  style={{ bottom: -5, right: 10 }}
                                  onClick={() => {
                                    handleStart({
                                      categoryId: data.id,
                                      categoryName: data.name,
                                      categoryDescription: data.description,
                                    });
                                  }}
                                >
                                  Start
                                </Button>
                              </Grid>
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    }
                  });
                }
              }
            })
          ) : (
            <Container>
              <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
                No category data
              </Typography>
            </Container>
          )}
        </Grid>
      ) : null}
      {openLesson ? <LessonAnswer setTitle={setTitle} /> : null}
    </React.Fragment>
  );
};

const mapToStateProps = (state, ownProps) => {
  return {
    userAuth: state.auth.userAuth,
    categories: state.category.categories,
    allAnswers: state.lesson.allAnswers,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapToStateProps, {
    fetchAllCategories,
    freshLesson,
    fetchAllAnswers,
  })(Category)
);

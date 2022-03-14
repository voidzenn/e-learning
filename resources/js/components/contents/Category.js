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

const Category = (props) => {
  const [openLesson, setOpenLesson] = useState(false);
  const [title, setTitle] = useState("Categories");

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
          {props.categories.length !== 0
            ? Object.entries(props.categories).map(([key, category]) => {
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
                          answerLength: item.answer_users,
                        };
                      })
                  : [];
                var newAns = [];
                if (isValidLength(ans)) {
                  // We need to get the first index of the object ans
                  newAns = ans[Object.keys(ans)[0]];
                }
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
              })
            : null}
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

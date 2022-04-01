import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { fetchCategoryWords } from "../../actions/lesson";
import { setUri } from "../../actions/header";

const Word = (props) => {
  const [expand, setExpand] = useState(0);
  // Run on first load
  useEffect(() => {
    if (props.type === "dashboard") {
      // Fetch all word from lessons based on user id
      props.fetchCategoryWords(props.userAuth.token, props.userAuth.id);
    } else {
      props.fetchCategoryWords(props.userAuth.token, props.userId);
    }
  }, []);

  const handleAccordion = (key) => {
    if (key === expand) {
      setExpand(false);
    } else {
      setExpand(key);
    }
  };
  // Handle lesson page redirection
  const handleLessonLink = (e, data) => {
    e.preventDefault();
    // Set the cookie so that the Lesson Answer Page is opened
    props.cookies.set("activeLesson", data, { path: "/" });
    // Set uri to categories
    props.setUri("/categories");
    // Set the activePage to stay on current page when the page reloads
    props.cookies.set("activePage", "/categories", { path: "/" });
  };
  // Render the categories and word data
  const renderCategoriesWords = () => {
    var answer = "";
    if (props.categoryWordsData.length !== 0) {
      const categoryWordData = Object.entries(props.categoryWordsData).map(
        ([key, data]) => {
          const newCategory = data.categories[Object.keys(data.categories)[0]];
          return (
            <Grid item key={key}>
              <Accordion
                expanded={expand === key}
                onClick={() => {
                  handleAccordion(key);
                }}
              >
                <AccordionDetails
                  sx={{ border: "1px solid #00000026", cursor: "pointer" }}
                >
                  <Grid container>
                    <Grid item lg={9} md={9} sm={9} xs={9}>
                      <Typography
                        sx={{ textTransform: "capitalize", fontWeight: "900" }}
                      >
                        {newCategory.name}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      {props.type === "dashboard" ? (
                        <Button
                          sx={{ m: 0, p: 0 }}
                          onClick={(e) => {
                            handleLessonLink(e, {
                              categoryId: newCategory.id,
                              categoryName: newCategory.name,
                              categoryDescription: newCategory.description,
                            });
                          }}
                        >
                          View Result
                        </Button>
                      ) : null}
                    </Grid>
                  </Grid>
                </AccordionDetails>
                <AccordionSummary sx={{ pb: 2, m: 2 }}>
                  <Grid container>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography>Words</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography>Correct Choice</Typography>
                    </Grid>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{ mb: 3 }}
                    ></Grid>
                    <Grid container>
                      {Object.entries(data.categories).map(([key2, data2]) => {
                        return Object.entries(data2.words).map(
                          ([key3, data3]) => {
                            return Object.entries(data3.choices).map(
                              ([key4, correctChoice]) => {
                                var answer = "";
                                // Render the correct choice
                                if (correctChoice.is_correct_answer === 1) {
                                  return (
                                    <React.Fragment key={key4}>
                                      <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <Typography>{data3.name}</Typography>
                                      </Grid>
                                      <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <Typography>
                                          {correctChoice.name}
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                      >
                                        <Divider sx={{ pb: 1 }} />
                                      </Grid>
                                    </React.Fragment>
                                  );
                                }
                              }
                            );
                          }
                        );
                      })}
                    </Grid>
                  </Grid>
                </AccordionSummary>
              </Accordion>
            </Grid>
          );
        }
      );
      return categoryWordData;
    } else {
      return <Typography>No Words Learned</Typography>;
    }
  };

  return (
    <Container sx={{ maxHeight: "1000px", overflow: "auto" }}>
      <Grid container sx={{ mt: 2, mb: 2 }}>
        {renderCategoriesWords()}
      </Grid>
    </Container>
  );
};

const mapToStateProps = (state) => {
  return {
    userAuth: state.auth.userAuth,
    categoryWordsData: state.lesson.categoryWordsData,
  };
};

export default withCookies(
  connect(mapToStateProps, {
    fetchCategoryWords,
    setUri,
  })(Word)
);

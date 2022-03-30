import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { fetchAllAnswers, fetchCategoryUser } from "../../actions/lesson";
import Activity from "./Activity";
import Word from "./Word";

const Dashboard = (props) => {
  const [tabValue, setTabValue] = useState("1");
  const [wordCount, setWordCount] = useState(0);
  // Run on first load
  useEffect(() => {
    // Get all lesson answers based on user id
    props.fetchAllAnswers(props.token, props.userAuth.id);
    // Get all the lessons that the user has finished or completed
    props.fetchCategoryUser(props.token, props.userAuth.id);
  }, []);

  useEffect(() => {
    if (props.allAnswers.length !== 0) {
      var count = 0;
      Object.entries(props.allAnswers).map(([key, answer]) => {
        count += answer.answer_users.length;
      });
      // Set state with word count
      setWordCount(count);
    }
  }, [props.allAnswers]);

  // Get cookie value
  const userAuthData = () => {
    const userAuth = props.cookies.get("userAuth");
    return userAuth !== undefined ? userAuth : null;
  };

  const handleChange = (e, value) => {
    setTabValue(value);
  };

  const wordsCount = () => {
    return props.allAnswers.length !== 0
      ? // Get the first array of object
        props.allAnswers[Object.keys(props.allAnswers)[0]].answer_users.length
      : 0;
  };

  const lessonCount = () => {
    return props.categoryUserData.length !== 0
      ? // Get the first array of object
        props.categoryUserData.length
      : 0;
  };

  return (
    <React.Fragment>
      <Container>
        <Grid container>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Typography component="h5" variant="h5" sx={{ mb: 5 }}>
              Dashboard
            </Typography>
          </Grid>
          <Grid item lg={8} md={8} sm={8} xs={12}></Grid>
        </Grid>
      </Container>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ p: 5 }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Grid container sx={{ p: 5 }}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <Avatar
                    alt="img"
                    variant="square"
                    src="images/avatars/profile.png"
                    sx={{ width: 140, height: 140, p: 2 }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6} sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Typography
                        style={{
                          fontWeight: "800",
                          fontSize: "18px",
                          textAlign: "center",
                        }}
                      >
                        {userAuthData().fname + " " + userAuthData().lname}
                      </Typography>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Typography
                        style={{
                          fontSize: "15px",
                          color: "#777777",
                        }}
                      >
                        Learned {wordCount} words
                      </Typography>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Typography
                        style={{
                          fontSize: "15px",
                          color: "#777777",
                        }}
                      >
                        Learned {lessonCount()} lessons
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Paper>
                <Box sx={{ p: 5 }}>
                  <TabContext value={tabValue}>
                    <Box>
                      <TabList onChange={handleChange}>
                        <Tab label="Activities" value="1" />
                        <Tab label="Words Learned" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <Activity userId={userAuthData().id} type="dashboard" />
                    </TabPanel>
                    <TabPanel value="2">
                      <Word userId={userAuthData().id} />
                    </TabPanel>
                  </TabContext>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

const mapToStateProps = (state, ownProps) => {
  return {
    token: state.auth.userAuth.token,
    userAuth: state.auth.userAuth,
    allAnswers: state.lesson.allAnswers,
    categoryUserData: state.lesson.categoryUserData,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapToStateProps, { fetchAllAnswers, fetchCategoryUser })(Dashboard)
);

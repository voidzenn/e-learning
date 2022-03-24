import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import Moment from "react-moment";
import moment from "moment";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import { fetchActivity, fetchSingleActivity } from "../../actions/activity";
import { setUri } from "../../actions/header";

const Activity = (props) => {
  // Get cookie value
  const profileData = () => {
    return props.cookies.get("profileData") !== undefined
      ? props.cookies.get("profileData")
      : null;
  };
  useEffect(() => {
    // Check if dasboard activity, if dashboard then get all activities
    if (props.type === "dashboard") {
      // Get all activities
      props.fetchActivity(props.token);
    } else {
      // Get specific activities of a user
      props.fetchSingleActivity(props.token, profileData().userId);
    }
  }, []);
  // If has data
  const isEmpty = () => {
    return props.activities.length !== 0 ? false : true;
  };
  // Handle user profile page redirection
  const handleProfileLink = (e, data) => {
    e.preventDefault();
    // Add profile data to cookie
    props.cookies.set("profileData", { userId: data.userId }, { path: "/" });
    // Set uri to profile
    props.setUri("/profile");
    // Set the activePage to stay on current page when the page reloads
    props.cookies.set("activePage", "/profile", { path: "/" });
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
  // Run after a period of time
  // setTimeout(() => {
  //   // Get all activities after 20 seconds
  //   props.fetchActivity(props.token);
  // }, 20000);

  const formatTime = (time) => {
    return moment(time).fromNow();
  };

  return (
    <React.Fragment>
      {props.activities.length !== 0 ? (
        <Container sx={{ maxHeight: "1000px", overflow: "auto" }}>
          <Grid container direction="column" spacing={2}>
            {!isEmpty()
              ? Object.entries(props.activities).map(([key, activity]) => {
                  if (activity.activable_type === "follow") {
                    // Show only what the currently signed in user has followed
                    if (activity.user.id === props.userAuth.id) {
                      return (
                        <Grid item key={key}>
                          <Card sx={{ border: "1px solid #00000026", p: 2 }}>
                            <Grid container>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Link
                                  href=""
                                  style={{
                                    display: "inline-block",
                                    marginRight: "5px",
                                  }}
                                  onClick={(e) => {
                                    handleProfileLink(e, {
                                      userId: props.userAuth.id,
                                    });
                                  }}
                                >
                                  <Typography>You</Typography>
                                </Link>
                                <Typography
                                  style={{
                                    display: "inline-block",
                                    marginRight: "5px",
                                  }}
                                >
                                  followed
                                </Typography>
                                <Link
                                  href=""
                                  style={{ display: "inline-block" }}
                                  onClick={(e) => {
                                    handleProfileLink(e, {
                                      userId: activity.followed.id,
                                    });
                                  }}
                                >
                                  <Typography>
                                    {activity.followed.fname +
                                      " " +
                                      activity.followed.lname}
                                  </Typography>
                                </Link>
                              </Grid>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Typography
                                  sx={{ color: "#777777", fontSize: "14px" }}
                                >
                                  {formatTime(activity.created_at)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      );
                    }
                  } else {
                    return (
                      <Grid item key={key} lg={12} md={12} sm={12} xs={12}>
                        <Card sx={{ border: "1px solid #00000026", p: 2 }}>
                          <Grid container>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Link
                                href=""
                                style={{
                                  display: "inline-block",
                                  marginRight: "5px",
                                }}
                                onClick={(e) => {
                                  handleProfileLink(e, {
                                    userId: activity.user_id,
                                  });
                                }}
                              >
                                <Typography>
                                  {props.userAuth.id === activity.user_id
                                    ? "You"
                                    : activity.user.fname +
                                      " " +
                                      activity.user.lname}
                                </Typography>
                              </Link>
                              <Typography
                                style={{
                                  display: "inline-block",
                                  marginRight: "5px",
                                }}
                              >
                                learned {activity.category.words.length} words
                                in
                              </Typography>
                              <Link
                                href=""
                                style={{ display: "inline-block" }}
                                onClick={(e) => {
                                  handleLessonLink(e, {
                                    categoryId: activity.category.id,
                                    categoryName: activity.category.name,
                                    categoryDescription:
                                      activity.category.description,
                                  });
                                }}
                              >
                                <Typography
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  {activity.category.name}
                                </Typography>
                              </Link>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Typography
                                sx={{ color: "#777777", fontSize: "14px" }}
                              >
                                {formatTime(activity.created_at)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    );
                  }
                })
              : null}
          </Grid>
        </Container>
      ) : (
        <Container sx={{ maxHeight: "300px", overflow: "auto" }}>
          <Typography>No activity for this user</Typography>
        </Container>
      )}
    </React.Fragment>
  );
};

const mapToStateProps = (state, ownProps) => {
  return {
    token: state.auth.userAuth.token,
    userAuth: state.auth.userAuth,
    activities: state.activity.activities,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapToStateProps, { fetchActivity, fetchSingleActivity, setUri })(
    Activity
  )
);

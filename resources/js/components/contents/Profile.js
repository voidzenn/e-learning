import React, { useEffect } from "react";
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
  Typography,
} from "@mui/material";

import { fetchSingleUser } from "../../actions/user";
import {
  fetchFollowData,
  followUser,
  setFollower,
  setFollowing,
  unfollowUser,
  setToUnfollow,
  freshFollow,
} from "../../actions/follow";

const Profile = (props) => {
  // Get profile data from cookie
  const profileData = () => {
    return props.cookies.get("profileData") !== undefined
      ? props.cookies.get("profileData")
      : null;
  };
  // Run on first load
  useEffect(() => {
    // Initialize the state on first load
    props.freshFollow();
    // Get the user profile data
    props.fetchSingleUser(props.token, profileData().userId);
    // Get the currently signed in user follows data
    props.fetchFollowData(props.token, props.userAuth.id);
  }, []);

  useEffect(() => {
    // If greater than 0
    if (props.singleUserData.length !== 0) {
      // Run function assign data to followers and followings
      followersFollowing();
    }
  }, [props.singleUserData]);

  const userData = () => {
    return props.singleUserData.length !== 0
      ? // This gets the data of the first id of the array of object
        props.singleUserData[Object.keys(props.singleUserData)[0]]
      : [];
  };

  const followersFollowing = () => {
    // Set data to followers
    props.setFollower(userData().followers.length);
    // Set data to followings
    props.setFollowing(userData().followings.length);
  };

  // Set the button to unfollow
  const handleFollow = (data) => {
    // Store data to follows table
    props.followUser(props.token, {
      user_id: data.userId,
      followed_id: data.followedId,
    });
  };
  // Set the button to unfollow
  const handleUnfollow = (data) => {
    // Destroy data in the follows table
    props.unfollowUser(props.token, {
      user_id: data.userId,
      followed_id: data.followedId,
    });
  };

  useEffect(() => {
    return props.followData.length !== 0
      ? // Get the follows data and assign to variables
        Object.entries(props.followData).map(([key2, data]) => {
          /**
           * Check if already followed, if already followed then update
           * follow button to unfollow.
           */
          if (data.followed_id === profileData().userId) {
            // Set follow to unfollow butotn
            props.setToUnfollow();
          }
        })
      : null;
  }, [props.followData]);

  return (
    <React.Fragment>
      <Container>
        <Grid container>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Typography component="h5" variant="h5" sx={{ mb: 5 }}>
              Profile
            </Typography>
          </Grid>
          <Grid item lg={8} md={8} sm={8} xs={12}></Grid>
        </Grid>
      </Container>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ pt: 5, pr: 10, pb: 5 }}>
          <Grid container>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Avatar
                    alt="img"
                    variant="square"
                    src="images/avatars/profile.png"
                    sx={{ width: 200, height: 200 }}
                  />
                </Grid>
                <Grid item sx={{ mt: 2 }}>
                  <Typography>
                    {userData().fname + " " + userData().lname}
                  </Typography>
                </Grid>
                <Grid item sx={{ mt: 1 }}>
                  <Divider sx={{ mb: "5px" }} />
                  <Grid container spacing={5}>
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="centerF"
                      >
                        <Grid item>
                          <Typography>{props.followers}</Typography>
                        </Grid>
                        <Grid>
                          <Typography sx={{ fontSize: "14px" }}>
                            Followers
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="centerF"
                      >
                        <Grid item>
                          <Typography>{props.following}</Typography>
                        </Grid>
                        <Grid>
                          <Typography sx={{ fontSize: "14px" }}>
                            Following
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {
                  // We can follow and unfollow others but not it's own
                  profileData().userId !== props.userAuth.id ? (
                    <Grid item sx={{ mt: 4 }}>
                      {props.isFollowButton ? (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            handleFollow({
                              userId: props.userAuth.id,
                              followedId: profileData().userId,
                            });
                          }}
                        >
                          Follow
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => {
                            handleUnfollow({
                              userId: props.userAuth.id,
                              followedId: profileData().userId,
                            });
                          }}
                        >
                          Unfollow
                        </Button>
                      )}
                    </Grid>
                  ) : null
                }
              </Grid>
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={12}>
              <Paper>
                <Box sx={{ p: 5 }}>
                  <Typography>Activity Log</Typography>
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
    singleUserData: state.user.singleUserData,
    followData: state.follow.followData,
    followers: state.follow.followers,
    following: state.follow.following,
    isFollowButton: state.follow.isFollowButton,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapToStateProps, {
    fetchSingleUser,
    fetchFollowData,
    followUser,
    setFollower,
    setFollowing,
    unfollowUser,
    setToUnfollow,
    freshFollow,
  })(Profile)
);

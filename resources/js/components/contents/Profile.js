import React from "react";
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

const Profile = (props) => {
  // Get profile data from cookie
  const profileData = props.cookies.get("profileData");

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
                  <Typography>John Doe</Typography>
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
                          <Typography>0</Typography>
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
                          <Typography>0</Typography>
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
                  // Check if cookie value exists
                  profileData !== undefined ? (
                    // We can follow and unfollow others but not it's own
                    profileData.user_id !== props.userAuth.id ? (
                      <Grid item sx={{ mt: 4 }}>
                        <Button variant="outlined">Follow</Button>
                      </Grid>
                    ) : null
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
    userAuth: state.auth.userAuth,
    cookies: ownProps.cookies,
  };
};

export default withCookies(connect(mapToStateProps, null)(Profile));

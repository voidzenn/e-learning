import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Input,
  LinearProgress,
  Tab,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Upload } from "@mui/icons-material";

import { uploadImage, freshFile } from "../../actions/file";
import { fetchSingleUser } from "../../actions/user";
import { setProfileEdit, updateUser } from "../../actions/profile";
import {
  validateFname,
  validateLname,
  validateEmail,
  freshProfile,
} from "../../actions/profile";
import EditPassword from "./EditPassword";
import AlertContent from "../../components/contents/subcontents/AlertContent";

const EditProfile = (props) => {
  const [tabValue, setTabValue] = useState("1");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [error, setError] = useState("");
  // Run on first load
  useEffect(() => {
    // Initialize state
    props.freshFile();
    props.freshProfile();
  }, []);
  // Run if userData props changes
  useEffect(() => {
    // If user data not empty
    if (props.userData.length !== 0) {
      // Assign props data to state
      props.setProfileEdit({
        fname: props.userData.fname,
        lname: props.userData.lname,
        email: props.userData.email,
      });
    }
  }, [props.userData]);
  // Run if there is changes in filePath state
  useEffect(() => {
    // Run if successfully uploaded image
    if (props.filePath !== null) {
      // Fetch single user data again
      props.fetchSingleUser(props.userAuth.token, props.userData.id);
      // We need to update user auth cookie data
      var authArray = props.userAuth;
      props.cookies.set(
        "userAuth",
        { ...authArray, avatar: props.filePath },
        {
          path: "/",
        }
      );
    }
  }, [props.filePath]);

  const handleUpload = (e) => {
    const file = e.target.files;
    // Check if not empty file
    if (file.length) {
      // Upload image
      props.uploadImage(props.userAuth.token, {
        file: file[0],
      });
    }
  };
  // Change tab content
  const handleChange = (e, value) => {
    setTabValue(value);
  };
  // Handle update user info
  const handleUpdate = () => {
    if (
      props.userData.fname === props.fname &&
      props.userData.lname === props.lname &&
      props.userData.email === props.email
    ) {
      setError("No changes");
    } else {
      setError("");
      // Update action
      props.updateUser(props.userAuth.token, props.userAuth.id, {
        fname: props.fname,
        lname: props.lname,
        email: props.email,
      });
    }
  };

  return (
    <Container>
      {props.requestErrorMessage !== "" ? (
        <AlertContent
          isError={props.requestError}
          message={props.requestErrorMessage}
        />
      ) : null}
      <Grid container spacing={2}>
        <Grid item md={5} sm={12} xs={12}>
          <Tooltip title="Upload new image">
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                sx={{ display: "none" }}
                onChange={(e) => {
                  handleUpload(e);
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  cursor: "pointer",
                }}
                component="span"
              >
                <Avatar
                  alt="img"
                  variant="square"
                  src={
                    props.userData.avatar === null
                      ? "images/avatars/profile.png"
                      : props.userData.avatar
                  }
                  sx={{ width: 200, height: 200 }}
                  style={{
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
                  {
                    // Change to progress bar if uploading image
                    props.progress === 0 ? (
                      <Upload
                        sx={{
                          width: 100,
                          height: 100,
                          color: "#1976D2",
                        }}
                      />
                    ) : (
                      <React.Fragment>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item>
                            <LinearProgress
                              variant="determinate"
                              value={props.progress}
                              style={{ width: "130px", height: "15px" }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography sx={{ fontWeight: "bold" }}>
                              {props.progress < 100
                                ? "Uploading " + props.progress + "%..."
                                : "Uploaded"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    )
                  }
                </Box>
              </Box>
            </label>
          </Tooltip>
        </Grid>
        <Grid item md={7} sm={12} xs={12}>
          <Box>
            <TabContext value={tabValue}>
              <Box>
                <TabList onChange={handleChange}>
                  <Tab label="Update Profile" value="1" />
                  <Tab label="Change Password" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid container spacing={1}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      onChange={(e) => {
                        props.validateFname(e.target.value);
                      }}
                      helperText={
                        props.fnameError === "" ? " " : props.fnameError
                      }
                      error={props.fnameError === "" ? false : true}
                      value={props.fname}
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      InputLabelProps={{ required: false }}
                      autoComplete="off"
                      size="small"
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      onChange={(e) => {
                        props.validateLname(e.target.value);
                      }}
                      helperText={
                        props.lnameError === "" ? " " : props.lnameError
                      }
                      error={props.lnameError === "" ? false : true}
                      value={props.lname}
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      InputLabelProps={{ required: false }}
                      size="small"
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                      onChange={(e) => {
                        props.validateEmail(e.target.value);
                      }}
                      helperText={
                        props.emailError === "" ? " " : props.emailError
                      }
                      error={props.emailError === "" ? false : true}
                      value={props.email}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      InputLabelProps={{ required: false }}
                      size="small"
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography
                      sx={{ color: "red", textAlign: "center", mt: -2, mb: 1 }}
                    >
                      {error}
                      &nbsp;
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{ mb: 2 }}
                      size="small"
                      fullWidth
                      disabled={submitDisabled}
                      onClick={handleUpdate}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <EditPassword userId={props.userData} />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapToStateProps = (state, ownProps) => {
  return {
    userAuth: state.auth.userAuth,
    progress: state.file.progress,
    requestError: state.file.requestError,
    requestErrorMessage: state.file.requestErrorMessage,
    filePath: state.file.filePath,
    fname: state.profile.fname,
    lname: state.profile.lname,
    email: state.profile.email,
    fnameError: state.profile.fnameError,
    lnameError: state.profile.lnameError,
    emailError: state.profile.emailError,
    isValidFname: state.profile.isValidFname,
    isValidLname: state.profile.isValidLname,
    isValidEmail: state.profile.isValidEmail,
    requestError: state.profile.requestError,
    requestErrorMessage: state.profile.requestErrorMessage,
    cookies: ownProps.cookies,
  };
};

export default withCookies(
  connect(mapToStateProps, {
    uploadImage,
    setProfileEdit,
    fetchSingleUser,
    validateFname,
    validateLname,
    validateEmail,
    updateUser,
    freshFile,
    freshProfile,
  })(EditProfile)
);

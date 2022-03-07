import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { fetchAllCategories } from "../../actions/category";
import Lesson from "./Lesson";

const Category = (props) => {
  const [openLesson, setOpenLesson] = useState(false);

  useEffect(() => {
    props.fetchAllCategories(props.userAuth.token);
  }, []);

  useEffect(() => {
    console.log(openLesson);
  }, [openLesson]);

  const formatText = (text) => {
    // Limit the text length of description
    if (text.length < 110) {
      return text;
    } else {
      return text.substring(0, 110) + "...";
    }
  };

  const handleStart = (e) => {
    e.preventDefault();
    // Handle the opening and closing of lesson page
    setOpenLesson(true);
  };

  return (
    <React.Fragment>
      <Container>
        <Grid container>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Typography component="h5" variant="h5" sx={{ mb: 5 }}>
              Categories
            </Typography>
          </Grid>
          <Grid item lg={8} md={8} sm={8} xs={12}>
            {/* {props.requestErrorMessage !== "" ? (
            <AlertContent
              isError={props.requestError}
              message={props.requestErrorMessage}
            />
          ) : null} */}
          </Grid>
        </Grid>
      </Container>
      {openLesson === false ? (
        <Grid container spacing={3}>
          {props.categories.length !== 0
            ? Object.entries(props.categories).map(([key, category]) => (
                <Grid key={key} item lg={4} md={4} sm={6} xs={6} sx={{ pb: 5 }}>
                  <Card sx={{ p: 1, minHeight: "220px", maxHeight: "220px" }}>
                    <CardContent sx={{ height: "155px" }}>
                      <Typography sx={{ fontWeight: 700 }}>
                        {category.name}
                      </Typography>
                      <br />
                      <Typography sx={{ fontSize: "15px" }}>
                        {formatText(category.description)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Grid container justifyContent="flex-end">
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ bottom: 3, right: 3 }}
                          onClick={handleStart}
                        >
                          Start
                        </Button>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      ) : null}
      {openLesson ? <Lesson /> : null}
    </React.Fragment>
  );
};

const mapToStateProps = (state) => {
  return {
    userAuth: state.auth.userAuth,
    categories: state.category.categories,
  };
};

export default connect(mapToStateProps, { fetchAllCategories })(Category);

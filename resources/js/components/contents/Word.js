import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Container, Divider, Grid, Typography } from "@mui/material";

import { fetchWords } from "../../actions/lesson";

const Word = (props) => {
  useEffect(() => {
    // Fetch all word from lessons based on user id
    props.fetchWords(props.userAuth.token, props.userAuth.id);
  }, []);

  const renderWords = () => {
    var answer = "";
    if (props.wordsData.length !== 0) {
      const wordData = Object.entries(props.wordsData).map(([key, data]) => {
        const userChoice = Object.entries(data.answer_users).map(
          (userChoice) => {
            if (userChoice.length !== 0) {
              return userChoice[Object.keys(userChoice)[1]];
            }
          }
        );
        return Object.entries(data.categories).map(([key2, data2]) => {
          return Object.entries(data2.words).map(([key3, data3]) => {
            return Object.entries(data3.choices).map(
              ([key4, correctChoice]) => {
                if (userChoice[key3].choice_id === correctChoice.id) {
                  answer = correctChoice.name;
                }
                if (correctChoice.is_correct_answer === 1) {
                  return (
                    <React.Fragment key={key4}>
                      <Grid item lg={4} md={4} sm={4} xs={4}>
                        <Typography sx={{ textTransform: "capitalize" }}>
                          {data3.name}
                        </Typography>
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={4}>
                        <Typography>{answer}</Typography>
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={4}>
                        <Typography>{correctChoice.name}</Typography>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Divider sx={{ pb: 1 }} />
                      </Grid>
                    </React.Fragment>
                  );
                }
              }
            );
          });
        });
      });
      return wordData;
    } else {
      return <Typography>No Words Learned</Typography>;
    }
  };

  return (
    <Container sx={{ maxHeight: "1000px", overflow: "auto" }}>
      <Grid container>
        {props.wordsData.length !== 0 ? (
          <React.Fragment>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Typography sx={{ fontWeight: "900" }}>Words</Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Typography sx={{ fontWeight: "900" }}>Answers</Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Typography sx={{ fontWeight: "900" }}>Correct Answer</Typography>
            </Grid>
          </React.Fragment>
        ) : null}
      </Grid>

      <Grid container sx={{ mt: 2 }}>
        {renderWords()}
      </Grid>
    </Container>
  );
};

const mapToStateProps = (state) => {
  return {
    userAuth: state.auth.userAuth,
    wordsData: state.lesson.wordsData,
  };
};

export default connect(mapToStateProps, {
  fetchWords,
})(Word);

import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Card, CardContent, Grid, Typography } from "@mui/material";

const Category = (props) => {
  return (
    <div>
      <Typography>Categories User</Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Card>
            <CardContent>This is a content</CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>This is a content</CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>This is a content</CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>This is a content</CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const mapToStateProps = (state) => {
  return {
    userAuth: state.auth.userAuth,
  };
};

export default connect(mapToStateProps)(Category);

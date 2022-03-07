import React from "react";

import { Container, Grid, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Container>
        <Grid container>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Typography component="h5" variant="h5" sx={{ mb: 5 }}>
              Dashboard
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        
      </Paper>
    </React.Fragment>
  );
};

export default Dashboard;

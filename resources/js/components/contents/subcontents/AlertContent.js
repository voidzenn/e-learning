import React from "react";

import { Alert, Snackbar } from "@mui/material";

const AlertContent = (props) => {
  return (
    <React.Fragment>
      <Snackbar
        open={true}
        autoHideDuration={3500}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity={!props.isError ? "success" : "error"} sx={{ mb: 2 }}>
          {props.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AlertContent;

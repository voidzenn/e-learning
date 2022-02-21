import React, { useState } from "react";

import { Alert, Collapse } from "@mui/material";

const AlertContent = (props) => {
  return (
    <div>
      <Collapse in={true}>
        <Alert
          severity={props.isError === false ? "success" : "error"}
          sx={{ mb: 2 }}
        >
          {props.message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default AlertContent;

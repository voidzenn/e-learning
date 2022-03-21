import React from "react";

import { LinearProgress } from "@mui/material";

const ProgressBar = (props) => {
  const calculateProgress = (index, length) => {
    if (index === 0 && length === 0) {
      /**
       * If arguments are 0 then return default value. This helps
       * in having a animation on reload of lesson page progress
       */
      return 0;
    } else {
      const percentage = 100 / length;
      // We need to add 1 to activeWord because the first index value is 0
      const current = percentage * (index);
      return current;
    }
  };

  return (
    <LinearProgress
      variant="determinate"
      value={calculateProgress(props.index, props.length)}
    />
  );
};

export default ProgressBar;

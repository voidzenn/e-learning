import React from "react";
import Typography from "@mui/material/Typography";

function Footer(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Links color="inherit" href="https://mui.com/">
          Your Website
        </Links>{' '} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Footer;

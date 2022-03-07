import React, { useEffect } from "react";

import { Container } from "@mui/material";

const Lesson = () => {
  useEffect(() => {
    console.log("mounted");
  }, []);

  return <Container>Lesson Page</Container>;
};

export default Lesson;

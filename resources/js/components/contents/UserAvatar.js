import React from "react";

import { Avatar } from "@mui/material";

const UserAvatar = (props) => {
  return (
    <Avatar
      alt={props.alt !== "" ? props.alt : "U"}
      variant="square"
      src={props.avatar !== null ? props.avatar : "images/avatars/profile.png"}
      sx={{ height: `${props.height}`, width: `${props.width}` }}
      style={{
        borderRadius: "100%",
        boxShadow: "inset 0 0 0px 11px #1976D266",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default UserAvatar;

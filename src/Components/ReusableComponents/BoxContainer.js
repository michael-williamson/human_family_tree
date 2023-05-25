import React from "react";
import { Box } from "@mui/system";

export const BoxContainer = (props) => {
  const { children } = props;
  return <Box {...props}>{children}</Box>;
};

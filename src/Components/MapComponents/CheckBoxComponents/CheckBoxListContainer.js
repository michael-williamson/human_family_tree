import React from "react";
import { Box } from "@mui/system";

export const CheckboxListContainer = (props) => {
  const { children, checkboxListContainerStyles } = props;
  return <Box sx={checkboxListContainerStyles}>{children}</Box>;
};

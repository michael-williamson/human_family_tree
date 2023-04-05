import React from "react";
import { Box } from "@mui/system";

export const TextComponent = ({ styles, children }) => {
  return <Box sx={styles}>{children}</Box>;
};

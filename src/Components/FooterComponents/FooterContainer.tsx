import React from "react";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { footerContainerStyles } from "../../Styles/FooterStyles";

export const FooterContainer = () => {
  const match = useMediaQuery("(max-width:991px)");
  const footerStyle = footerContainerStyles(match);
  return <Box sx={footerStyle}></Box>;
};

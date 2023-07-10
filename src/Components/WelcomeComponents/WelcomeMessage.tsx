import React from "react";
import { Box } from "@mui/system";
import { welcomeMessageTextStyles } from "../../Styles/WelcomeComponentStyles";

export const WelcomeMessage = () => {
  return (
    <>
      <Box sx={welcomeMessageTextStyles}>
        The journey to become what we are today is full of surprises and also
        mystery.
      </Box>
      <Box sx={welcomeMessageTextStyles}>
        The goal of this site is to help draw a clearer picture by providing
        interactive charts, maps, and image galleries.
      </Box>
      <Box sx={welcomeMessageTextStyles}>Enjoy the journey as you explore!</Box>
    </>
  );
};

import React from "react";
import { Box } from "@mui/system";
import { WelcomeMessage } from "./WelcomeMessage";
import { welcomeContainerStyles } from "../../Styles/WelcomeComponentStyles";

export const WelcomeContainer = () => {
  return (
    <Box sx={welcomeContainerStyles}>
      <WelcomeMessage />
    </Box>
  );
};

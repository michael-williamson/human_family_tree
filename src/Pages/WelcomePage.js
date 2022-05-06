import React from "react";
import { Box } from "@mui/system";
import { PageTitle } from "../Components/ReusableComponents/PageTitle";
import { cavemanIcon } from "../Media/PageTitle_Navigation_Icons";
import { WelcomeContainer } from "../Components/WelcomeComponents/WelcomeContainer";
import {
  welcomePageTitleContainerStyles,
  welcomePageTitleStyles,
} from "../Styles/WelcomeComponentStyles";

export const WelcomePage = () => {
  return (
    <Box>
      <PageTitle
        text="Welcome"
        imageSrc={cavemanIcon}
        pageTitleContainerAdditionalStyles={welcomePageTitleContainerStyles}
        specificTextStyles={welcomePageTitleStyles}
      />
      <WelcomeContainer />
    </Box>
  );
};

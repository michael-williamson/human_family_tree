import React from "react";
import { Box } from "@mui/system";
import { PageTitle } from "../Components/ReusableComponents/PageTitle";
import { ChartsMainContainer } from "../Components/ChartComponents/ChartsMainContainer";
import { routesIcons } from "../HelperFunctions/Routes";

export const ChartPage = () => {
  return (
    <Box>
      <PageTitle text="Charts" imageSrc={routesIcons.Charts} />
      <ChartsMainContainer />
    </Box>
  );
};

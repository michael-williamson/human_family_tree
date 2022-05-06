import React from "react";
import { Box } from "@mui/system";
import { routesIcons } from "../Routes/routes";
import { PageTitle } from "../Components/ReusableComponents/PageTitle";
import { ChartsMainContainer } from "../Components/ChartComponents/ChartsMainContainer";

export const ChartPage = () => {
  return (
    <Box>
      <PageTitle text="Charts" imageSrc={routesIcons.Charts} />
      <ChartsMainContainer />
    </Box>
  );
};

import React from "react";
import { Box } from "@mui/system";
import { PageTitle } from "../Components/ReusableComponents/PageTitle";
import { routesIcons } from "../HelperFunctions/Routes";

export const GlossaryPage = () => {
  return (
    <Box>
      <PageTitle text="Glossary" imageSrc={routesIcons.Glossary} />
    </Box>
  );
};

import React from "react";
import { Box } from "@mui/system";
import { PageTitle } from "../Components/ReusableComponents/PageTitle";
import { GalleryMainContainer } from "../Components/GalleryComponents/GalleryMainContainer";
import { routesIcons } from "../HelperFunctions/Routes";

export const GalleryPage = () => {
  return (
    <Box>
      <PageTitle text="Gallery" imageSrc={routesIcons.Gallery} />
      <GalleryMainContainer />
    </Box>
  );
};

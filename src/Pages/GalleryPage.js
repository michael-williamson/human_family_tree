import React from "react";
import { Box } from "@mui/system";
import { routesIcons } from "../Routes/routes";
import { PageTitle } from "../Components/ReusableComponents/PageTitle";
import { GalleryMainContainer } from "../Components/GalleryComponents/GalleryMainContainer";

export const GalleryPage = () => {
  return (
    <Box>
      <PageTitle text="Gallery" imageSrc={routesIcons.Gallery} />
      <GalleryMainContainer />
    </Box>
  );
};

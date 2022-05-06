import React, { useState } from "react";
import { Box } from "@mui/system";
import { SpecimensView } from "./SpecimensView";
import { GalleryMenuContainer } from "./GalleryMenuContainer";
import { galleryMainContainerStyles } from "../../Styles/GalleryComponentStyles";

export const GalleryMainContainer = () => {
  const [species, setSpecies] = useState();
  const speciesHandler = (species) => (e) => {
    setSpecies(species);
  };
  return (
    <Box sx={galleryMainContainerStyles}>
      <GalleryMenuContainer handler={speciesHandler} />
      <SpecimensView species={species} />
    </Box>
  );
};

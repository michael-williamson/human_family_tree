import React, { useState } from "react";
import { Box } from "@mui/system";
import { SpecimensView } from "./SpecimensView";
import { GalleryMenuContainer } from "./GalleryMenuContainer";
import { galleryMainContainerStyles } from "../../Styles/GalleryComponentStyles";
import { MapPopulationStateContext } from "../MapComponents/MapStateComponents/MapPopulationStateContext";
import { HTTPRequestStateProvider } from "../MapComponents/MapStateComponents/HTTPRequestStateProvider";

export const GalleryMainContainer = () => {
  const [species, setSpecies] = useState();
  const speciesHandler = (species) => (e) => {
    setSpecies(species);
  };
  return (
    <Box sx={galleryMainContainerStyles}>
      <GalleryMenuContainer handler={speciesHandler} />
      <MapPopulationStateContext>
        <HTTPRequestStateProvider>
          <SpecimensView species={species} />
        </HTTPRequestStateProvider>
      </MapPopulationStateContext>
    </Box>
  );
};

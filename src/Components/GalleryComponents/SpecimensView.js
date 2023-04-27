import React from "react";
import { Box } from "@mui/system";
import { IndividualSpecimen } from "./IndividualSpecimen";
import { specimensViewContainer } from "../../Styles/GalleryComponentStyles/SpecimensView";
import { useSpecimensArrayContext } from "../MapComponents/MapStateComponents/MapPopulationStateContext";

export const SpecimensView = (props) => {
  const specimensArray = useSpecimensArrayContext();
  return (
    <Box sx={specimensViewContainer}>
      {specimensArray
        .filter((item) => item.species === props.species)
        .map((item) => (
          <IndividualSpecimen {...item} key={item.ID} />
        ))}
    </Box>
  );
};

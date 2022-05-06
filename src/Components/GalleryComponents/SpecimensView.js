import React from "react";
import { Box } from "@mui/system";
import anthroData from "../../Data/anthroData.json";
import { IndividualSpecimen } from "./IndividualSpecimen";
import { specimensViewContainer } from "../../Styles/GalleryComponentStyles/SpecimensView";

export const SpecimensView = (props) => {
  return (
    <Box sx={specimensViewContainer}>
      {anthroData
        .filter((item) => item.species === props.species)
        .map((item) => (
          <IndividualSpecimen {...item} key={item.name} />
        ))}
    </Box>
  );
};

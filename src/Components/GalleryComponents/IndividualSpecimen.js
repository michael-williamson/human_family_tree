import React, { useState } from "react";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
import { ImageSearch } from "@mui/icons-material";
import { SpecimenLabels } from "../GalleryComponents/IndividualSpecimenComponents/SpecimenLabels";
import { SpecimenInfoText } from "../GalleryComponents/IndividualSpecimenComponents/SpecimenInfoText";
import {
  individualSpecimenContainer,
  individualSpecimenFields,
  specimenInfoStyles,
  specimenLabelStyles,
  moreInfoLinkStyles,
  imageViewIconStyles,
  individualSpecimenFieldsContainerFN,
} from "../../Styles/GalleryComponentStyles/IndividualSpecimenStyles";

const labels = [
  "Species",
  "Location",
  "Country",
  "Continent",
  "Date",
  "Image Credit",
  "More Info",
];

// tool to convert labels into corresponding property value on json
const propertyConversion = {
  Location: "city",
  "More Info": (props) => (
    <Link
      href={props["linkToInfo"]}
      underline="none"
      target="_blank"
      rel="noreferrer"
      sx={moreInfoLinkStyles}
    >
      Click for More Info
    </Link>
  ),
  "Image Credit": () => "text to prove calling",
};

export const IndividualSpecimen = (props) => {
  const [opacity, setOpacity] = useState(true);
  const { linksToPhotos } = props;
  const opacityHandler = (bool) => (e) => {
    setOpacity(bool);
  };

  return (
    <Box
      sx={individualSpecimenContainer(linksToPhotos[0]) || {}}
      className="individualSpecimen"
    >
      <ImageSearch
        sx={imageViewIconStyles}
        onMouseEnter={opacityHandler(false)}
        onMouseLeave={opacityHandler(true)}
        onTouchStart={opacityHandler(!opacity)}
      />

      <Box sx={individualSpecimenFieldsContainerFN(opacity)}>
        {labels.map((item, index) => (
          <Box sx={{ ...individualSpecimenFields }} key={index}>
            <SpecimenLabels label={`${item}:`} styles={specimenLabelStyles} />
            <SpecimenInfoText
              text={
                props[item.toLowerCase()] ||
                props[propertyConversion[item]] ||
                propertyConversion[item](props)
              }
              styles={specimenInfoStyles}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

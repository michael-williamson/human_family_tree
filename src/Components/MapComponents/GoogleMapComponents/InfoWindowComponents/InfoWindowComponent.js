import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { CardMedia } from "@mui/material";
import { InfoWindow } from "@react-google-maps/api";
import { TextComponent } from "../../../ReusableComponents/TextComponent";
import {
  infoWindowMainContainerStyles,
  infoWindowContainerStyles,
  infoWindowIndividualFieldsContainer,
  infoWindowLabelFieldStyles,
  infoWindowTextFieldStyles,
  infoWindowTitleText,
  infoWindowImageStyles,
} from "../../../../Styles/MapComponentStyles/GoogleMapComponentStyles/InfoWindowComponentStyles";
import { InfoFieldLabel } from "./IndividualInfoWindowComponents/InfoFieldLabel";
import { InfoFieldText } from "./IndividualInfoWindowComponents/InfoFieldText";

const labels = [
  "Location",
  "Country",
  "Continent",
  "Species",
  "Date",
  //   "More Info",
];

const propertyConversion = {
  Location: "city",
  "More Info": (props) => (
    <Link
      href={props["linkToInfo"]}
      underline="none"
      target="_blank"
      rel="noreferrer"
      sx={{}}
    >
      Click for More Info
    </Link>
  ),
  "Image Credit": () => "text to prove calling",
};

export const InfoWindowComponent = (props) => {
  const { itemObject, handleCloseInfoWindowClick } = props;
  if (Object.keys(itemObject).length <= 0) return null;
  return (
    <Box sx={infoWindowMainContainerStyles}>
      <InfoWindow
        position={{ lat: itemObject.gpsCoor.lat, lng: itemObject.gpsCoor.long }}
        onCloseClick={handleCloseInfoWindowClick}
      >
        <Box sx={infoWindowContainerStyles}>
          <TextComponent text={itemObject.name} styles={infoWindowTitleText} />
          <CardMedia
            component="img"
            src={itemObject.linksToPhotos[1]}
            sx={infoWindowImageStyles}
          />
          {labels.map((item) => (
            <Box key={item} sx={infoWindowIndividualFieldsContainer}>
              <InfoFieldLabel text={item} styles={infoWindowLabelFieldStyles} />
              <InfoFieldText
                text={
                  itemObject[item.toLowerCase()] ||
                  itemObject[propertyConversion[item]] ||
                  propertyConversion[item](itemObject)
                }
                styles={infoWindowTextFieldStyles}
              />
            </Box>
          ))}
        </Box>
      </InfoWindow>
    </Box>
  );
};

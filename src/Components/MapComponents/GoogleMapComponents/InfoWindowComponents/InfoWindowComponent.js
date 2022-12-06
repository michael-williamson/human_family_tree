import React from "react";
// import { Link } from "react-router-dom";
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
import {
  useInfoWindowContext,
  useInfoWindowContextUpdater,
} from "../../MapStateComponents/InfoWindowStateProvider";
import { CLOSE_INFO_WINDOW, SPECIES } from "../../../../ConstantVariableNames";
import {
  paragraphTextFields,
  typeOfMarkersObject,
  windowsWithParagraphs,
} from "../../../../HelperFunctions/MapComponent/GoogleMapsComponent/InfoWindowComponents";

export const InfoWindowComponent = (props) => {
  const { item: itemObject, typeOfMarker } = useInfoWindowContext();
  const infoWindowContextUpdater = useInfoWindowContextUpdater();

  if (Object.keys(itemObject).length <= 0) return null;

  const labelObject = typeOfMarkersObject[typeOfMarker];

  // examineStyles & styleExaminer allow dynamic styling ,  & this case in particular
  // deals with paragraph style text & whether or not to use whiteSpace: "nowrap" or
  // whitespace: "break-spaces"

  const examineStyles = windowsWithParagraphs.includes(typeOfMarker);

  const styleExaminer = (item) => {
    return paragraphTextFields[item]
      ? { ...infoWindowTextFieldStyles, whiteSpace: "break-spaces" }
      : infoWindowTextFieldStyles;
  };

  return (
    <Box sx={infoWindowMainContainerStyles}>
      <InfoWindow
        position={{ lat: itemObject.gpsCoor.lat, lng: itemObject.gpsCoor.long }}
        onCloseClick={() =>
          infoWindowContextUpdater({ type: CLOSE_INFO_WINDOW })
        }
      >
        <Box sx={infoWindowContainerStyles}>
          <TextComponent text={itemObject.name} styles={infoWindowTitleText} />
          <CardMedia
            component="img"
            // some JSON files have larger / smaller images in separate indexes
            src={
              typeOfMarker === SPECIES
                ? itemObject.linksToPhotos[1]
                : itemObject.linksToPhotos[0]
            }
            sx={infoWindowImageStyles}
          />
          {Object.keys(labelObject).map((item) => (
            <Box key={item} sx={infoWindowIndividualFieldsContainer}>
              <InfoFieldLabel text={item} styles={infoWindowLabelFieldStyles} />
              <InfoFieldText
                text={itemObject[labelObject[item]]}
                styles={
                  examineStyles
                    ? styleExaminer(item)
                    : infoWindowTextFieldStyles
                }
              />
            </Box>
          ))}
        </Box>
      </InfoWindow>
    </Box>
  );
};

import React from "react";
// import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { CardMedia, Link } from "@mui/material";
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
  descriptionLabelStyle,
  individualFieldContainerStyle,
  imageAttributionLabelStyles,
  imageAttributionLinkStyles,
} from "../../../../Styles/MapComponentStyles/GoogleMapComponentStyles/InfoWindowComponentStyles";

import {
  useInfoWindowContext,
  useInfoWindowContextUpdater,
} from "../../MapStateComponents/InfoWindowStateProvider";
import { CLOSE_INFO_WINDOW, SPECIES } from "../../../../ConstantVariableNames";
import {
  typeOfMarkersObject,
  windowsWithParagraphs,
  styleExaminer,
} from "../../../../HelperFunctions/MapComponent/GoogleMapsComponent/InfoWindowComponents";
import { InfoWindowFieldComponent } from "./IndividualInfoWindowComponents/InfoWindowFieldComponent";
import { ImageAttributionComponent } from "../../../ReusableComponents/ImageAttributionComponent";

export const InfoWindowComponent = (props) => {
  const { item: itemObject, typeOfMarker } = useInfoWindowContext();
  const infoWindowContextUpdater = useInfoWindowContextUpdater();

  if (Object.keys(itemObject).length <= 0) return null;

  const labelObject = typeOfMarkersObject[typeOfMarker];

  const [author = "", license = ""] = itemObject.imageAttributesArray;

  // examineStyles & styleExaminer allow dynamic styling ,  & this case in particular
  // deals with paragraph style text & whether or not to use whiteSpace: "nowrap" or
  // whitespace: "break-spaces"

  const examineStyles = windowsWithParagraphs.includes(typeOfMarker);

  return (
    <Box sx={infoWindowMainContainerStyles}>
      <InfoWindow
        position={{ lat: itemObject.gpsCoor.lat, lng: itemObject.gpsCoor.long }}
        onCloseClick={() =>
          infoWindowContextUpdater({ type: CLOSE_INFO_WINDOW })
        }
      >
        <Box sx={infoWindowContainerStyles}>
          <TextComponent styles={infoWindowTitleText}>
            {itemObject.name}
          </TextComponent>
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
          <ImageAttributionComponent
            author={author}
            license={license}
            labelStyles={imageAttributionLabelStyles}
            linkStyles={imageAttributionLinkStyles}
          />
          {Object.keys(labelObject).map((item) => (
            <Box
              key={item}
              sx={
                examineStyles
                  ? styleExaminer(
                      item,
                      infoWindowIndividualFieldsContainer,
                      individualFieldContainerStyle
                    )
                  : infoWindowIndividualFieldsContainer
              }
            >
              <InfoWindowFieldComponent
                label={`${item}:`}
                labelStyles={
                  examineStyles
                    ? styleExaminer(
                        item,
                        infoWindowLabelFieldStyles,
                        descriptionLabelStyle
                      )
                    : infoWindowLabelFieldStyles
                }
                fieldText={itemObject[labelObject[item]]}
                fieldTextStyles={
                  examineStyles
                    ? styleExaminer(
                        item,
                        infoWindowLabelFieldStyles,
                        descriptionLabelStyle
                      )
                    : infoWindowTextFieldStyles
                }
              />
            </Box>
          ))}
          <InfoWindowFieldComponent
            label={"Link to More Info:"}
            labelStyles={infoWindowLabelFieldStyles}
            fieldText={
              <Link
                component="a"
                href={itemObject.linkToInfo}
                sx={infoWindowTextFieldStyles}
                target="_blank"
                rel="noreferrer"
              >
                Click Here
              </Link>
            }
          />
        </Box>
      </InfoWindow>
    </Box>
  );
};

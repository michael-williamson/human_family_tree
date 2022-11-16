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
import {
  useInfoWindowContext,
  useInfoWindowContextUpdater,
} from "../../MapStateComponents/InfoWindowStateProvider";
import { CLOSE_INFO_WINDOW } from "../../../../ConstantVariableNames";

const labels = (item) => {
  if (item["eventName"]) {
    return ["Event", "Location", "Country", "Continent", "Date"];
  } else if (item["city"]) {
    return [
      "Location",
      "Country",
      "Continent",
      "Species",
      "Date",
      //   "More Info",
    ];
  }

  return ["Point of Interest"];
};

const propertyConversion = {
  Event: "eventName",
  Location: "city",
  "Point of Interest": "name",
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
  const itemObject = useInfoWindowContext();
  const infoWindowContextUpdater = useInfoWindowContextUpdater();
  if (Object.keys(itemObject).length <= 0) return null;
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
            src={
              itemObject["city"]
                ? itemObject.linksToPhotos[1]
                : itemObject.linksToPhotos[0]
            }
            sx={infoWindowImageStyles}
          />
          {labels(itemObject).map((item) => (
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

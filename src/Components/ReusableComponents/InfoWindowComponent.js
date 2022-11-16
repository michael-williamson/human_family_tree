import { Box } from "@mui/system";
import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import { infoWindowMainContainerStyles } from "../../Styles/MapComponentStyles/GoogleMapComponentStyles/InfoWindowComponentStyles";

export const InfoWindowComponent = (props) => {
  const { children } = props;
  return (
    <Box sx={infoWindowMainContainerStyles}>
      <InfoWindow>{children}</InfoWindow>
    </Box>
  );
};

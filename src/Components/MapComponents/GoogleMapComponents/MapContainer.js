import React from "react";
import { Box } from "@mui/system";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { mapContainerStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";
import { MapLegendStateProvider } from "../MapStateComponents/MapLegendStateProvider";
import { InfoWindowStateProvider } from "../MapStateComponents/InfoWindowStateProvider";

export const MapContainer = () => {
  return (
    <Box sx={mapContainerStyles}>
      <MapLegendStateProvider>
        <InfoWindowStateProvider>
          <GoogleMapComponent />
        </InfoWindowStateProvider>
      </MapLegendStateProvider>
    </Box>
  );
};

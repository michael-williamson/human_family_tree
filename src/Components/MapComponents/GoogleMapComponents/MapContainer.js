import React from "react";
import { Box } from "@mui/system";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { mapContainerStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";
import { MapLegendStateProvider } from "../MapStateComponents/MapLegendStateProvider";
import { InfoWindowStateProvider } from "../MapStateComponents/InfoWindowStateProvider";
import { HTTPRequestStateProvider } from "../MapStateComponents/HTTPRequestStateProvider";
import { MapPopulationStateContext } from "../MapStateComponents/MapPopulationStateContext";

export const MapContainer = () => {
  return (
    <Box sx={mapContainerStyles}>
      <MapPopulationStateContext>
        <HTTPRequestStateProvider>
          <MapLegendStateProvider>
            <InfoWindowStateProvider>
              <GoogleMapComponent />
            </InfoWindowStateProvider>
          </MapLegendStateProvider>
        </HTTPRequestStateProvider>
      </MapPopulationStateContext>
    </Box>
  );
};

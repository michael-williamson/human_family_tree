import React, { useState } from "react";
import { Box } from "@mui/system";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { mapContainerStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";
import { MapLegendStateProvider } from "../MapStateComponents/MapLegendStateProvider";
import { InfoWindowStateProvider } from "../MapStateComponents/InfoWindowStateProvider";
import { MapLegendFieldsCount } from "../MapStateComponents/MapLegendFieldsCount";
import { HTTPRequestStateProvider } from "../MapStateComponents/HTTPRequestStateProvider";
import { MapPopulationStateContext } from "../MapStateComponents/MapPopulationStateContext";

export const MapContainer = () => {
  const [currentItem, setCurrentItem] = useState({});

  const handleMarkerClick = (item) => (markerClick) => (e) => {
    markerClick && setCurrentItem(item);
  };

  const handleCloseInfoWindowClick = () => {
    setCurrentItem({});
  };

  return (
    <Box sx={mapContainerStyles}>
      <MapPopulationStateContext>
        <HTTPRequestStateProvider>
          <MapLegendStateProvider>
            <MapLegendFieldsCount>
              <InfoWindowStateProvider>
                <GoogleMapComponent
                  handleMarkerClick={handleMarkerClick}
                  currentItem={currentItem}
                  handleCloseInfoWindowClick={handleCloseInfoWindowClick}
                />
              </InfoWindowStateProvider>
            </MapLegendFieldsCount>
          </MapLegendStateProvider>
        </HTTPRequestStateProvider>
      </MapPopulationStateContext>
    </Box>
  );
};

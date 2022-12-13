import React, { useState } from "react";
import { Box } from "@mui/system";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { mapContainerStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";
import specimensArray from "../../../Data/anthroData.json";
import { speciesIconColorObjectFN } from "../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents";
import { MapLegendStateProvider } from "../MapStateComponents/MapLegendStateProvider";
import { SpecimensArrayStateProvider } from "../MapStateComponents/SpecimensArrayStateProvider";
import { InfoWindowStateProvider } from "../MapStateComponents/InfoWindowStateProvider";

const speciesIconColorObject = speciesIconColorObjectFN(
  specimensArray,
  "species"
);

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
      <SpecimensArrayStateProvider>
        <MapLegendStateProvider>
          <InfoWindowStateProvider>
            <GoogleMapComponent
              speciesIconColorObject={speciesIconColorObject}
              handleMarkerClick={handleMarkerClick}
              currentItem={currentItem}
              handleCloseInfoWindowClick={handleCloseInfoWindowClick}
            />
          </InfoWindowStateProvider>
        </MapLegendStateProvider>
      </SpecimensArrayStateProvider>
    </Box>
  );
};

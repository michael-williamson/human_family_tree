import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, Collapse } from "@mui/material";
import { MapKey } from "../MapKeyComponents/MapKey";
import { GoogleMapComponent } from "./GoogleMapComponent";
import {
  mapContainerStyles,
  showMapKeyButtonStyles,
} from "../../../Styles/MapComponentStyles/MapContainerStyles";
import specimensArray from "../../../Data/anthroData.json";
import { svgObjectFN } from "../../../HelperFunctions/General";
import { speciesIconColorObjectFN } from "../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents";
import { MapLegendStateProvider } from "../MapStateComponents/MapLegendStateProvider";
import { SpecimensArrayStateProvider } from "../MapStateComponents/SpecimensArrayStateProvider";
import { InfoWindowStateProvider } from "../MapStateComponents/InfoWindowStateProvider";

const speciesIconColorObject = speciesIconColorObjectFN(
  specimensArray,
  "species"
);

const svgObject = svgObjectFN(speciesIconColorObject, {
  width: 40,
  height: 40,
});

export const MapContainer = () => {
  const [showMapKey, setShowMapKey] = useState(true);
  const [currentItem, setCurrentItem] = useState({});

  const handleShowMapKey = () => {
    setShowMapKey(!showMapKey);
  };

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
            <Button onClick={handleShowMapKey} sx={showMapKeyButtonStyles}>
              {showMapKey ? "Hide Map Key" : "Show Map Key"}
            </Button>
            <Collapse in={showMapKey}>
              <MapKey svgObject={svgObject} />
            </Collapse>
          </InfoWindowStateProvider>
        </MapLegendStateProvider>
      </SpecimensArrayStateProvider>
    </Box>
  );
};

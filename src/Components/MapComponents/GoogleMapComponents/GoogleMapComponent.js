import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Skeleton } from "@mui/material";
import { MarkerList } from "./MarkerList";
import { PolygonListArrayFN } from "../../../HelperFunctions/MapComponent/GoogleMapsComponent";
import { InfoWindowComponentContainer } from "./InfoWindowComponents/InfoWindowComponentContainer";
import {
  useMapLegendContext,
  useMapLegendFieldContext,
  useMapLegendIconColorObjectContext,
} from "../MapStateComponents/MapLegendStateProvider";
import { useSpecimensArrayContext } from "../MapStateComponents/SpecimensArrayStateProvider";
import overlayDataArray from "../../../Data/overlayData.json";
import {
  addIconOptionsFN,
  comparisonFN,
} from "../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents";
import { OVERLAYS, SPECIES } from "../../../ConstantVariableNames";
import theme from "../../../theme";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 28.751911,
  lng: 23.4010213,
};

const { REACT_APP_GOOGLE_API } = process.env;

const options = { mapTypeId: "satellite", gestureHandling: "auto" };

export const GoogleMapComponent = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_API,
  });
  const mapLegendContext = useMapLegendContext();
  const specimensArr = useSpecimensArrayContext();
  const mapLegendField = useMapLegendFieldContext();
  const speciesIconColorObject = useMapLegendIconColorObjectContext();

  const { handleMarkerClick, currentItem, handleCloseInfoWindowClick } = props;

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return <Skeleton />;
  }
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2.5}
      options={options}
    >
      {PolygonListArrayFN(mapLegendContext.overlays)}
      <MarkerList
        speciesIconColorObject={speciesIconColorObject}
        handleMarkerClick={handleMarkerClick}
        arr={specimensArr}
        // function used to highlight Markers corresponding with map key field being hovered on
        comparisonFN={comparisonFN(true, SPECIES, mapLegendField)}
        addIconOptionsFN={addIconOptionsFN(
          true,
          SPECIES,
          speciesIconColorObject
        )}
        googleMarkerComponentProps={{
          // if any Markers are highlighted this will equal a string otherwise null indicates true
          // --> for animation
          animation: mapLegendField === null,
        }}
      />
      <MarkerList
        arr={overlayDataArray}
        labelObject={{
          color: theme.palette.primary.main,
          fontSize: "14px",
          fontWeight: "bold",
          className: "my-marker-labels",
          mapKeyValues: mapLegendContext[OVERLAYS],
        }}
        comparisonFN={comparisonFN(true, OVERLAYS, mapLegendField)}
        googleMarkerComponentProps={{
          showIcon: false,
        }}
      />
      <InfoWindowComponentContainer
        currentItem={currentItem}
        handleCloseInfoWindowClick={handleCloseInfoWindowClick}
      />
    </GoogleMap>
  );
};

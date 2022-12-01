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
import entryExitPoints from "../../../Data/entryExitPoints.json";
import eventsList from "../../../Data/eventsList.json";
import { comparisonFN } from "../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents";
import {
  HYBRID,
  OVERLAYS,
  ROADMAP,
  SATELLITE,
  SPECIES,
} from "../../../ConstantVariableNames";
import theme from "../../../theme";
import {
  footPrintBlueIcon,
  skullIcon,
  volcanoIcon,
} from "../../../Media/MapIcons";
import { useInfoWindowContext } from "../MapStateComponents/InfoWindowStateProvider";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 28.751911,
  lng: 23.4010213,
};

const mapTypesStringArray = [SATELLITE, ROADMAP, HYBRID];

const { REACT_APP_GOOGLE_API } = process.env;

const options = {
  mapTypeId: SATELLITE,
  gestureHandling: "auto",
  mapTypeControl: true,
  mapTypeControlOptions: {
    mapTypeIds: mapTypesStringArray,
  },
};

const librariesArray = ["drawing"];

export const GoogleMapComponent = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_API,
    libraries: librariesArray,
  });
  const mapLegendContext = useMapLegendContext();
  const specimensArr = useSpecimensArrayContext();
  const mapLegendField = useMapLegendFieldContext();
  const speciesIconColorObject = useMapLegendIconColorObjectContext();
  const infoWindowContext = useInfoWindowContext();

  const { handleMarkerClick, handleCloseInfoWindowClick } = props;

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
      onClick={(e) => console.log(e, "mouse click event object")}
      id="myGoogleMap"
    >
      {PolygonListArrayFN(mapLegendContext.overlays)}
      <MarkerList
        speciesIconColorObject={speciesIconColorObject}
        handleMarkerClick={handleMarkerClick}
        arr={specimensArr}
        // function used to highlight Markers corresponding with map key field being hovered on
        comparisonFN={comparisonFN(true, SPECIES, mapLegendField)}
        iconObject={{
          url: skullIcon,
          scaledSize: { width: 35, height: 35 },
        }}
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
        iconObject={{ path: window.google.maps.SymbolPath.CIRCLE, scale: 0 }}
        comparisonFN={comparisonFN(true, OVERLAYS, mapLegendField)}
        googleMarkerComponentProps={{
          showIcon: true,
        }}
      />
      <MarkerList
        arr={entryExitPoints}
        iconObject={{
          url: footPrintBlueIcon,
          scaledSize: { width: 30, height: 30 },
        }}
        googleMarkerComponentProps={{
          showIcon: true,
        }}
      />
      <MarkerList
        arr={eventsList}
        iconObject={{
          url: volcanoIcon,
          scaledSize: { width: 30, height: 30 },
        }}
      />
      <InfoWindowComponentContainer
        currentItem={infoWindowContext}
        handleCloseInfoWindowClick={handleCloseInfoWindowClick}
      />
    </GoogleMap>
  );
};

import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Skeleton, Button } from "@mui/material";

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
  ENTRY_EXIT_POINTS,
  EVENTS,
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
import {
  useInfoWindowContext,
  useInfoWindowContextUpdater,
} from "../MapStateComponents/InfoWindowStateProvider";
import { MapKeyControl } from "./CustomControls/MapKeyControl";
import { MapKey } from "../MapKeyComponents/MapKey";
import { HideMapKeyControl } from "./CustomControls/HideMapKeyControl";
import { showMapKeyButtonStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";
import { LatLngPosition } from "./InfoBoxComponents/LatLngPosition";

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

// window.google.maps.ControlPosition  the object key/value pairs
// e.g. TOP_LEFT: 1 ,  the object can be viewed in the console by
// typing window.google.maps.ControlPosition,  this explains how I
// got to the value below for the position of some Controls

const options = {
  mapTypeId: SATELLITE,
  gestureHandling: "auto",
  scrollwheel: false,
  zoomControl: true,
  zoomControlOptions: {
    // position is set to top left for zoom
    position: 1,
  },
  mapTypeControl: true,
  mapTypeControlOptions: {
    mapTypeIds: mapTypesStringArray,
  },
};

export const GoogleMapComponent = (props) => {
  const [libraries] = useState(["drawing"]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_API,
    libraries,
  });
  const [mapInstance, setMapInstance] = useState(null);
  const [hideMapKey, setHideMapKey] = useState(false);
  const mapLegendContext = useMapLegendContext();
  const specimensArr = useSpecimensArrayContext();
  const mapLegendField = useMapLegendFieldContext();
  const speciesIconColorObject = useMapLegendIconColorObjectContext();
  const infoWindowContext = useInfoWindowContext();
  const infoWindowContextUpdater = useInfoWindowContextUpdater();
  const [latLngObject, setLatLngObject] = useState({ lat: 0, lng: 0 });
  const [rightClick, setRightClick] = useState(false);

  const { handleMarkerClick, handleCloseInfoWindowClick } = props;

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return <Skeleton />;
  }

  const handleOnLoad = (instance) => {
    if (instance) {
      setMapInstance(instance);
    }
  };

  const handleHideMapKey = () => setHideMapKey((prev) => !prev);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2.5}
      options={options}
      onLoad={handleOnLoad}
      onRightClick={(e) => {
        setLatLngObject({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        setRightClick(true);
      }}
      id="myGoogleMap"
    >
      <Marker position={latLngObject} visible={latLngObject.lat !== 0} />
      <HideMapKeyControl mapInstance={mapInstance}>
        <Button onClick={handleHideMapKey} sx={showMapKeyButtonStyles}>
          {hideMapKey ? "Show Map Key" : "Hide Map Key"}
        </Button>
      </HideMapKeyControl>
      <MapKeyControl mapInstance={mapInstance}>
        <MapKey hideMapKey={hideMapKey} />
      </MapKeyControl>
      <LatLngPosition
        latLngObject={latLngObject}
        rightClick={rightClick}
        setRightClick={setRightClick}
        setLatLngObject={setLatLngObject}
      />
      {PolygonListArrayFN(mapLegendContext.overlays, infoWindowContextUpdater)}
      <MarkerList
        speciesIconColorObject={speciesIconColorObject}
        handleMarkerClick={handleMarkerClick}
        arr={specimensArr}
        typeOfMarker={SPECIES}
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
        typeOfMarker={OVERLAYS}
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
          zIndex: 2000,
        }}
      />
      <MarkerList
        arr={entryExitPoints}
        typeOfMarker={ENTRY_EXIT_POINTS}
        iconObject={{
          url: footPrintBlueIcon,
          scaledSize: { width: 30, height: 30 },
        }}
      />
      <MarkerList
        arr={eventsList}
        typeOfMarker={EVENTS}
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

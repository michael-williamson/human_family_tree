import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, InfoBox } from "@react-google-maps/api";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
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
  scrollwheel: false,
  zoomControl: true,
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
  const mapLegendContext = useMapLegendContext();
  const specimensArr = useSpecimensArrayContext();
  const mapLegendField = useMapLegendFieldContext();
  const speciesIconColorObject = useMapLegendIconColorObjectContext();
  const infoWindowContext = useInfoWindowContext();
  const [latLngObject, setLatLngObject] = useState({ lat: 0, lng: 0 });
  const infoBoxInstance = useRef(null);

  useEffect(() => {
    const instance = infoBoxInstance.current;
    if (instance?.closeListener) {
      let obj = instance.closeListener.instance;
      // eslint-disable-next-line no-unused-vars
      obj.hidden = true;
    }
  }, [infoBoxInstance.current?.closeListener]);

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
      onRightClick={(e) => {
        if (infoBoxInstance.current.isHidden === true) {
          infoBoxInstance.current.isHidden = false;
        }
        setLatLngObject({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      }}
      id="myGoogleMap"
    >
      <InfoBox
        position={latLngObject}
        pixelOffset={{ height: 0, width: 0 }}
        onLoad={(instance) => {
          infoBoxInstance.current = instance;
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.customColors.darkBG,
            borderRadius: 2,
            width: 230,
            display: "grid",
            gridTemplateColumns: "auto auto",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "white",
              cursor: "pointer",
            }}
            onClick={(e) => {
              infoBoxInstance.current.isHidden = true;
              setLatLngObject({ lat: 0, lng: 0 });
            }}
          >
            X
          </Box>
          <Box sx={{ color: "white", fontSize: 20, py: 1, pl: 3 }}>
            lat: {latLngObject.lat.toFixed(2)}
          </Box>
          <Box sx={{ color: "white", fontSize: 20, py: 1 }}>
            lng: {latLngObject.lng.toFixed(2)}
          </Box>
        </Box>
      </InfoBox>

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

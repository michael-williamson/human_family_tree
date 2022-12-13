import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  InfoBox,
  Marker,
} from "@react-google-maps/api";
import { IconButton, Skeleton, Button } from "@mui/material";
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
import { ContentCopy } from "@mui/icons-material";
import { MapKeyControl } from "./CustomControls/MapKeyControl";
import { MapKey } from "../MapKeyComponents/MapKey";
import { HideMapKeyControl } from "./CustomControls/HideMapKeyControl";
import { showMapKeyButtonStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";

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
        if (infoBoxInstance.current.isHidden === true) {
          infoBoxInstance.current.isHidden = false;
        }
        setLatLngObject({ lat: e.latLng.lat(), lng: e.latLng.lng() });
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
      <InfoBox
        position={latLngObject}
        pixelOffset={{ height: 40, width: 40 }}
        onLoad={(instance) => {
          infoBoxInstance.current = instance;
          instance.isHidden = true;
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.customColors.darkBG,
            borderRadius: 2,
            width: 350,
            display: "grid",
            gridTemplateColumns: "repeat(3,auto)",
            gridTemplateRows: "repeat(2,auto)",
            justifyContent: "space-around",
            position: "relative",
          }}
        >
          <Box
            sx={{
              color: "white",
              cursor: "pointer",
              fontSize: 14,
              textAlign: "center",
              gridColumn: "1/4",
            }}
            onClick={(e) => {
              infoBoxInstance.current.isHidden = true;
              setLatLngObject({ lat: 0, lng: 0 });
            }}
          >
            [close]
          </Box>
          <Box sx={{ color: "white", fontSize: 20, py: 1, pl: 3 }}>
            lat: {latLngObject.lat.toFixed(2)}
          </Box>
          <Box sx={{ color: "white", fontSize: 20, py: 1 }}>
            lng: {latLngObject.lng.toFixed(2)}
          </Box>
          <IconButton
            onClick={(e) =>
              navigator.clipboard
                .writeText(
                  `lat:${latLngObject.lat.toFixed(
                    2
                  )} lng:${latLngObject.lng.toFixed(2)}`
                )
                .then((val) => alert("copied!", val))
            }
          >
            <ContentCopy sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </InfoBox>

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

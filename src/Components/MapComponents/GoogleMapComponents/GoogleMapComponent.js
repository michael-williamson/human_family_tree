import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Skeleton, Button } from "@mui/material";
import { InfoWindowComponentContainer } from "./InfoWindowComponents/InfoWindowComponentContainer";
import { HYBRID, ROADMAP, SATELLITE } from "../../../ConstantVariableNames";
import { MapKeyControl } from "./CustomControls/MapKeyControl";
import { MapKey } from "../MapKeyComponents/MapKey";
import { HideMapKeyControl } from "./CustomControls/HideMapKeyControl";
import { showMapKeyButtonStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";
import { LatLngPosition } from "./InfoBoxComponents/LatLngPosition";
import { MarkerListsContainer } from "./MarkerComponents/MarkerListsContainer";
import { LakeTobaCircleComponent } from "./ShapeComponents/LakeTobaCircleComponent";
import { PolygonListComponent } from "../../../HelperFunctions/MapComponent/GoogleMapsComponent/PolygonComponents/PolygonListComponent";

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
  const [latLngObject, setLatLngObject] = useState({ lat: 0, lng: 0 });
  const [rightClick, setRightClick] = useState(false);

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
      <PolygonListComponent />
      <MarkerListsContainer />

      <LakeTobaCircleComponent />
      <InfoWindowComponentContainer />
    </GoogleMap>
  );
};

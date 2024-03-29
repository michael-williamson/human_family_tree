import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Skeleton, Button } from "@mui/material";
import { HYBRID, ROADMAP, SATELLITE } from "../../../ConstantVariableNames";
import { MapKeyControl } from "./CustomControls/MapKeyControl";
import { HideMapKeyControl } from "./CustomControls/HideMapKeyControl";
import { showMapKeyButtonStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";
import { LatLngPosition } from "./InfoBoxComponents/LatLngPosition";
import { LakeTobaCircleComponent } from "./ShapeComponents/LakeTobaCircleComponent";
import { PolygonListComponent } from "./ShapeComponents/PolygonListComponent";
import { MarkerItemInfoWindow } from "./InfoWindowComponents/MarkerItemInfoWindow";
import { MapKeyContainer } from "../MapKey/MapKeyContainer";
import { MarkerListsContainer } from "./MarkerComponents/MarkerListsContainer";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 28.751911,
  lng: 23.4010213,
};

const mapTypesStringArray = [SATELLITE, ROADMAP, HYBRID];

const googleAPI = process.env.REACT_APP_GOOGLE_API!;

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

export const GoogleMapComponent = (props: any) => {
  const [libraries] = useState(["drawing"] as any);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleAPI,
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

  const handleOnLoad = (instance: any) => {
    if (instance) {
      setMapInstance(instance);
    }
  };

  const handleHideMapKey = () => setHideMapKey(prev => !prev);

  const rightClickHandler = (e: any) => {
    setLatLngObject({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setRightClick(true);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2.5}
      options={options}
      onLoad={handleOnLoad}
      onRightClick={rightClickHandler}
      id="myGoogleMap"
    >
      <Marker position={latLngObject} visible={latLngObject.lat !== 0} />
      <HideMapKeyControl mapInstance={mapInstance}>
        <Button onClick={handleHideMapKey} sx={showMapKeyButtonStyles}>
          {hideMapKey ? "Show Map Key" : "Hide Map Key"}
        </Button>
      </HideMapKeyControl>
      <MapKeyControl mapInstance={mapInstance}>
        <MapKeyContainer visibility={hideMapKey ? "hidden" : "visible"} />
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
      <MarkerItemInfoWindow />
    </GoogleMap>
  );
};

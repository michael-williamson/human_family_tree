import React from "react";
import {
  // DrawingManager,
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";
import { MarkerPopulate } from "./MarkerPopulate";

import { PolygonComponent } from "../PolygonComponent";
import {
  arabiaPaths,
  iceAgeEurope2Paths,
  laurentideIceSheetPaths,
  saharaPaths,
} from "./pathsForPolygon";
import { CircularProgress } from "@material-ui/core";
import { librariesArr } from "../../data/listArrays";
// import { onDrawingManagerLoad, onPolygonComplete } from "../helperFunctions";
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

function MapComponent(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_API,
    libraries: librariesArr,
  });
  const { desertPolygon, northAmericanPolygon, europeanPolygon } = props;

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return <CircularProgress />;
  }

  function RenderMap(props) {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2.5}
        options={options}
      >
        {/* Child components, such as markers, info windows, etc. */}

        <MarkerPopulate {...props} />
        {desertPolygon.greenSahara ? (
          <PolygonComponent
            paths={saharaPaths}
            fillColor="rgb(81 101 74 / 75%)"
          />
        ) : null}
        {desertPolygon.greenArabia ? (
          <PolygonComponent
            paths={arabiaPaths}
            fillColor="rgb(81 101 74 / 75%)"
          />
        ) : null}
        {!europeanPolygon || (
          <PolygonComponent
            paths={iceAgeEurope2Paths}
            fillColor="rgb(246 246 246 / 60%)"
          />
        )}
        {!northAmericanPolygon || (
          <PolygonComponent
            paths={laurentideIceSheetPaths}
            fillColor="rgb(246 246 246 / 60%)"
          />
        )}
        {/* <DrawingManager
          onLoad={onDrawingManagerLoad}
          onPolygonComplete={onPolygonComplete}
        /> */}
      </GoogleMap>
    );
  }
  return RenderMap(props);
}

export default React.memo(MapComponent);

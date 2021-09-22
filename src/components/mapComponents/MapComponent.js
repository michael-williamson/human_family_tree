import React from "react";
import { MarkerPopulate } from "./MarkerPopulate";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { PolygonComponent } from "../PolygonComponent";
import { arabiaPaths, saharaPaths } from "./pathsForPolygon";
const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 28.751911,
  lng: 23.4010213,
};

function MapComponent(props) {
  const { REACT_APP_GOOGLE_API } = process.env;
  const { saharaPolygon, arabiaPolygon } = props;

  return (
    <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_API}>
      <GoogleMap
        clusterer={<div> here</div>}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2.5}
        options={{ mapTypeId: "satellite", gestureHandling: "auto" }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <MarkerPopulate {...props} />
        {saharaPolygon ? <PolygonComponent paths={saharaPaths} /> : null}
        {arabiaPolygon ? <PolygonComponent paths={arabiaPaths} /> : null}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapComponent);

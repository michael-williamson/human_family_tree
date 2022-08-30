import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Skeleton } from "@mui/material";
import { MarkerList } from "./MarkerList";
import { PolygonListArrayFN } from "../../../HelperFunctions/MapComponent/GoogleMapsComponent";
import { InfoWindowComponentContainer } from "./InfoWindowComponents/InfoWindowComponentContainer";
import { useMapLegendContext } from "../MapStateComponents/MapLegendStateProvider";

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

  const {
    speciesIconColorObject,
    handleMarkerClick,
    currentItem,
    handleCloseInfoWindowClick,
  } = props;

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
      />

      <InfoWindowComponentContainer
        currentItem={currentItem}
        handleCloseInfoWindowClick={handleCloseInfoWindowClick}
      />
    </GoogleMap>
  );
};

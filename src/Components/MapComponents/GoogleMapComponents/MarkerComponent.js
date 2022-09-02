import React from "react";
import { Marker } from "@react-google-maps/api";

export const MarkerComponent = (props) => {
  const {
    lat,
    lng,
    fillColor,
    strokeColor,
    handleMarkerClick,
    highLighted,
    preventAnimation,
  } = props;
  return (
    <Marker
      animation={preventAnimation && window.google.maps.Animation.DROP}
      position={{ lat, lng }}
      icon={{
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: fillColor,
        fillOpacity: 0.6,
        strokeColor: strokeColor,
        strokeWeight: 2,
        scale: highLighted ? 25 : 7,
      }}
      onClick={handleMarkerClick(true)}
    />
  );
};

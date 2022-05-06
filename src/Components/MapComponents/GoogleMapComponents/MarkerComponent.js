import React from "react";
import { Marker } from "@react-google-maps/api";

export const MarkerComponent = (props) => {
  const { lat, lng, fillColor, strokeColor, handleMarkerClick } = props;
  return (
    <Marker
      animation={window.google.maps.Animation.DROP}
      position={{ lat, lng }}
      icon={{
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: fillColor,
        fillOpacity: 0.6,
        strokeColor: strokeColor,
        strokeWeight: 2,
        scale: 7,
      }}
      onClick={handleMarkerClick(true)}
    />
  );
};

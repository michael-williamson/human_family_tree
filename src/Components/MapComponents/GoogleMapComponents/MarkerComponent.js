import React from "react";
import { Marker } from "@react-google-maps/api";

export const MarkerComponent = (props) => {
  const {
    lat,
    lng,
    fillColor,
    strokeColor,
    handleMarkerClick,
    showIcon = true,
    labelObject,
    highLighted = false,
  } = props;
  return (
    <Marker
      // animation={animation && window.google.maps.Animation.DROP}
      animation={false}
      position={{ lat, lng }}
      icon={
        showIcon
          ? {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: fillColor,
              fillOpacity: 0.6,
              strokeColor: strokeColor,
              strokeWeight: 2,
              scale: highLighted ? 25 : 7,
            }
          : "cancel"
      }
      label={labelObject}
      onClick={handleMarkerClick(true)}
    />
  );
};

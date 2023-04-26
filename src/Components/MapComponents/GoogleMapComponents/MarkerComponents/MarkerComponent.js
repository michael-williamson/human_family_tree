import React from "react";
import { Marker } from "@react-google-maps/api";

export const MarkerComponent = (props) => {
  const {
    lat,
    lng,
    iconObject,
    showIcon = true,
    item,
    labelObject,
    highLighted = false,
    typeOfMarker = "default",
    googleMarkerComponentProps = {},
    clickHandler,
  } = props;

  const handleClick = () => {
    clickHandler && clickHandler({ item, typeOfMarker });
  };

  let icon = null;

  if (showIcon && highLighted) {
    icon = {
      ...iconObject,
      scaledSize: { height: 100, width: 100 },
    };
  } else if (showIcon) {
    icon = { ...iconObject, scaledSize: { height: 35, width: 35 } };
  }

  return (
    <Marker
      // animation={animation && window.google.maps.Animation.DROP}
      animation={false}
      position={{ lat, lng }}
      icon={icon}
      label={labelObject}
      onClick={handleClick}
      {...googleMarkerComponentProps}
    />
  );
};

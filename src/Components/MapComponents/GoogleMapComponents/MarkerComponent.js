import React from "react";
import { Marker } from "@react-google-maps/api";

export const MarkerComponent = (props) => {
  const {
    lat,
    lng,
    iconObject,
    showIcon,
    item,
    labelObject,
    highLighted = false,
    typeOfMarker = "default",
    googleMarkerComponentProps = {},
    clickHandler,
  } = props;

  const handleClick = () => {
    clickHandler({ item, typeOfMarker });
  };

  return (
    <Marker
      // animation={animation && window.google.maps.Animation.DROP}
      animation={false}
      position={{ lat, lng }}
      icon={
        showIcon
          ? {
              ...iconObject,
              scaledSize: highLighted
                ? { height: 100, width: 100 }
                : { height: 35, width: 35 },
            }
          : null
      }
      label={labelObject}
      onClick={handleClick}
      {...googleMarkerComponentProps}
    />
  );
};

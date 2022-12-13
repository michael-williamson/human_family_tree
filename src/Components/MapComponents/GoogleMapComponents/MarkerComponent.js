import React from "react";
import { Marker } from "@react-google-maps/api";
import { useInfoWindowContextUpdater } from "../MapStateComponents/InfoWindowStateProvider";
import { OPEN_INFO_WINDOW } from "../../../ConstantVariableNames";

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
  } = props;
  const infoWindowContextUpdater = useInfoWindowContextUpdater();
  const handleClick = () =>
    infoWindowContextUpdater({
      type: OPEN_INFO_WINDOW,
      payload: { typeOfMarker, item },
    });
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

import React from "react";
import { Box } from "@mui/system";
import { MarkerComponent } from "./MarkerComponent";

export const MarkerList = (props) => {
  const {
    arr = [],
    labelObject,
    iconObject = {},
    googleMarkerComponentProps = {},
    typeOfMarker,
    showIcon = true,
    clickHandler,
    mapLegendFieldContext = null,
  } = props;

  const labelObjectUpdater = (obj, name) => {
    const objCopy = { ...obj };
    objCopy.text = name;
    return obj["mapKeyValues"][name] ? objCopy : null;
  };

  const highLighted = (item) => {
    return item[typeOfMarker] === mapLegendFieldContext;
  };

  return (
    <Box>
      {arr.map((item) => (
        <MarkerComponent
          key={`${item.name}${Math.random() * 1000}`}
          typeOfMarker={typeOfMarker}
          lat={item.gpsCoor.lat}
          lng={item.gpsCoor?.lng || item.gpsCoor.long}
          labelObject={
            labelObject ? labelObjectUpdater(labelObject, item.name) : undefined
          }
          highLighted={mapLegendFieldContext && highLighted(item)}
          item={item}
          iconObject={iconObject}
          showIcon={showIcon}
          googleMarkerComponentProps={googleMarkerComponentProps}
          clickHandler={clickHandler}
        />
      ))}
    </Box>
  );
};

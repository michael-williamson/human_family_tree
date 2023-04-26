import React from "react";
import { Box } from "@mui/system";
import { MarkerComponent } from "./MarkerComponent";
import { v4 } from "uuid";

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
          key={v4()}
          typeOfMarker={typeOfMarker}
          lat={item.gpsCoor.lat}
          lng={item.gpsCoor.lng}
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

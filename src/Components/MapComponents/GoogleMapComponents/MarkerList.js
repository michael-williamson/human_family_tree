import React from "react";
import { Box } from "@mui/system";
import { MarkerComponent } from "./MarkerComponent";

export const MarkerList = (props) => {
  const {
    arr = [],
    labelObject,
    iconObject = {},
    googleMarkerComponentProps = {},
    comparisonFN,
    typeOfMarker,
    showIcon = true,
  } = props;

  const labelObjectUpdater = (obj, name) => {
    const objCopy = { ...obj };
    objCopy.text = name;
    return obj["mapKeyValues"][name] ? objCopy : null;
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
          highLighted={comparisonFN && comparisonFN(item)}
          item={item}
          iconObject={{ ...iconObject }}
          showIcon={showIcon}
          googleMarkerComponentProps={googleMarkerComponentProps}
        />
      ))}
    </Box>
  );
};

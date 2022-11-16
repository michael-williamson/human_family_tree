import React from "react";
import { Box } from "@mui/system";
import { MarkerComponent } from "./MarkerComponent";

export const MarkerList = (props) => {
  const {
    // handleMarkerClick,
    arr = [],
    labelObject,
    iconObject = {},
    googleMarkerComponentProps = {},
    comparisonFN,
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
          lat={item.gpsCoor.lat}
          lng={item.gpsCoor.long}
          labelObject={
            labelObject ? labelObjectUpdater(labelObject, item.name) : undefined
          }
          highLighted={comparisonFN && comparisonFN(item)}
          item={item}
          iconObject={{ ...iconObject }}
          {...googleMarkerComponentProps}
        />
      ))}
    </Box>
  );
};

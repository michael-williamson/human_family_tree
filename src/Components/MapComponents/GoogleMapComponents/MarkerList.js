import React from "react";
import { Box } from "@mui/system";
import { MarkerComponent } from "./MarkerComponent";

export const MarkerList = (props) => {
  const { arr, speciesIconColorObject, handleMarkerClick } = props;
  return (
    <Box>
      {arr.map((item) => (
        <MarkerComponent
          key={`${item.name}${Math.random() * 1000}`}
          lat={item.gpsCoor.lat}
          lng={item.gpsCoor.long}
          markerLabel={item.name}
          fillColor={speciesIconColorObject[item.species]}
          strokeColor={speciesIconColorObject[item.species]}
          handleMarkerClick={handleMarkerClick(item)}
        />
      ))}
    </Box>
  );
};

import React from "react";
import { Box } from "@mui/system";
import { MarkerComponent } from "./MarkerComponent";
import { useSpecimensArrayContext } from "../MapStateComponents/SpecimensArrayStateProvider";
import { useMapLegendFieldContext } from "../MapStateComponents/MapLegendStateProvider";
import { SPECIES } from "../../../ConstantVariableNames";

export const MarkerList = (props) => {
  const arr = useSpecimensArrayContext();
  const field = useMapLegendFieldContext();
  const { speciesIconColorObject, handleMarkerClick } = props;
  return (
    <Box>
      {arr.map((item) => (
        <MarkerComponent
          key={`${item.name}${Math.random() * 1000}`}
          lat={item.gpsCoor.lat}
          lng={item.gpsCoor.long}
          markerLabel={item.name}
          preventAnimation={field === ""}
          highLighted={item[SPECIES] === field}
          fillColor={speciesIconColorObject[item[SPECIES]]}
          strokeColor={speciesIconColorObject[item[SPECIES]]}
          handleMarkerClick={handleMarkerClick(item)}
        />
      ))}
    </Box>
  );
};

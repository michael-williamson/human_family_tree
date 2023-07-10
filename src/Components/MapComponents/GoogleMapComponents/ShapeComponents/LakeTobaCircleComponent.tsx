import React from "react";
import { Circle } from "@react-google-maps/api";
import { useOverlaysCheckbox } from "../../../../State/MapState/MapLegendState/OverlaysCheckboxProvider";
import { LAKE_TOBA_ERUPTION } from "../../../../ConstantVariableNames";

export const LakeTobaCircleComponent = () => {
  const overlaysCheckboxContext = useOverlaysCheckbox();
  if (!overlaysCheckboxContext[LAKE_TOBA_ERUPTION]) {
    return null;
  }
  return (
    <>
      <Circle
        center={{ lat: 2.6845, lng: 98.8756 }}
        radius={2375000}
        options={{
          strokeColor: "#c61c1c99",
          strokeOpacity: 0.6,
          fillColor: "#c61c1c99",
          fillOpacity: 0.5,
          visible: true,
          zIndex: 1,
        }}
      />
    </>
  );
};

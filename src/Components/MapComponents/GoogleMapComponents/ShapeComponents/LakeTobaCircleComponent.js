import React from "react";
import { useMapLegendContext } from "../../MapStateComponents/MapLegendStateProvider";
import { Circle } from "@react-google-maps/api";

export const LakeTobaCircleComponent = () => {
  const mapLegendContext = useMapLegendContext();
  return (
    <>
      {" "}
      {mapLegendContext.overlays["Lake Toba Eruption"] && (
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
      )}
    </>
  );
};

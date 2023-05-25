import React from "react";
import { useMapLegendFieldContext } from "../MapComponents/MapStateComponents/MapLegendStateProvider";
import { MarkerList } from "../MapComponents/GoogleMapComponents/MarkerComponents/MarkerList";

export const FieldContextHookComponent = props => {
  const mapLegendFieldContext = useMapLegendFieldContext();

  return (
    <MarkerList {...props} mapLegendFieldContext={mapLegendFieldContext} />
  );
};

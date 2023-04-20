import React from "react";
import { useMapLegendFieldContext } from "../MapComponents/MapStateComponents/MapLegendStateProvider";
import { MarkerList } from "../MapComponents/GoogleMapComponents/MarkerList";

export const FieldContextHookComponent = (props) => {
  const mapLegendFieldContext = useMapLegendFieldContext();

  return (
    <MarkerList
      {...props}
      mapLegendFieldContext={mapLegendFieldContext}
      googleMarkerComponentProps={{
        // if any Markers are highlighted this will equal a string otherwise null indicates true
        // --> for animation
        animation: mapLegendFieldContext === null,
      }}
    />
  );
};

import React from "react";
import { useMapLegendContext } from "../../../../Components/MapComponents/MapStateComponents/MapLegendStateProvider";
import { useInfoWindowContextUpdater } from "../../../../Components/MapComponents/MapStateComponents/InfoWindowStateProvider";
import { PolygonListArrayFN } from "..";
import { useOverlayArrayContext } from "../../../../Components/MapComponents/MapStateComponents/MapPopulationStateContext";

export const PolygonListComponent = () => {
  const mapLegendContext = useMapLegendContext();
  const infoWindowContextUpdater = useInfoWindowContextUpdater();
  const overlaysArray = useOverlayArrayContext();
  return (
    <div>
      {" "}
      {PolygonListArrayFN(
        mapLegendContext.overlays,
        infoWindowContextUpdater,
        overlaysArray
      )}
    </div>
  );
};

import React from "react";
import { useMapLegendContext } from "../../../../Components/MapComponents/MapStateComponents/MapLegendStateProvider";
import { useInfoWindowContextUpdater } from "../../../../Components/MapComponents/MapStateComponents/InfoWindowStateProvider";
import { PolygonListArrayFN } from "..";

export const PolygonListComponent = () => {
  const mapLegendContext = useMapLegendContext();
  const infoWindowContextUpdater = useInfoWindowContextUpdater();
  return (
    <div>
      {" "}
      {PolygonListArrayFN(mapLegendContext.overlays, infoWindowContextUpdater)}
    </div>
  );
};

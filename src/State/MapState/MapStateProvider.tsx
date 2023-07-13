import React, { useContext } from "react";
import { MapLegendStateProvider } from "./MapLegendState/MapLegendStateProvider";
import { MapArraysProvider } from "./MapItemStateArrays/MapArraysProvider";
import { CountProvider } from "./MapItemCountState/CountProvider";
import { TimelineAnimationState } from "./MapTimelineAnimation/TimelineAnimationState";

const MapContext = React.createContext({});
const MapContextUpdater = React.createContext({});

export function useMapContext() {
  return useContext(MapContext);
}

export function useMapContextUpdater() {
  return useContext(MapContextUpdater);
}

export const MapStateProvider = ({ children }: any) => {
  return (
    <MapContextUpdater.Provider value={{}}>
      <MapLegendStateProvider>
        <CountProvider>
          <MapArraysProvider>
            <TimelineAnimationState>{children}</TimelineAnimationState>
          </MapArraysProvider>
        </CountProvider>
      </MapLegendStateProvider>
    </MapContextUpdater.Provider>
  );
};

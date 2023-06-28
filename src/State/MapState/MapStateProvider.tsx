import React, { useContext } from "react";
import { MapLegendStateProvider } from "./MapLegendState/MapLegendStateProvider";
import { MapArraysProvider } from "./MapItemStateArrays/MapArraysProvider";
import { CountProvider } from "./MapItemCountState/CountProvider";

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
          <MapArraysProvider>{children}</MapArraysProvider>
        </CountProvider>
      </MapLegendStateProvider>
    </MapContextUpdater.Provider>
  );
};

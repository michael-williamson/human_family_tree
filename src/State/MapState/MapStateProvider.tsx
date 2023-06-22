import React, { useContext, useState } from "react";
import { MapLegendStateProvider } from "./MapLegendState/MapLegendStateProvider";
import { MapArraysProvider } from "./MapItemStateArrays/MapArraysProvider";

const MapContext = React.createContext({});
const MapContextUpdater = React.createContext(({}) => {});

export function useMapContext() {
  return useContext(MapContext);
}

export function useMapContextUpdater() {
  return useContext(MapContextUpdater);
}

export const MapStateProvider = ({ children }: any) => {
  const [action, setAction] = useState({
    type: "initial",
    category: "initial",
    fieldName: "initial",
  });
  const clickHandler = (actionObject: any) => {
    setAction(actionObject);
  };

  return (
    <MapContextUpdater.Provider value={clickHandler}>
      <MapLegendStateProvider action={action} setAction={setAction}>
        <MapArraysProvider action={action}>{children}</MapArraysProvider>
      </MapLegendStateProvider>
    </MapContextUpdater.Provider>
  );
};

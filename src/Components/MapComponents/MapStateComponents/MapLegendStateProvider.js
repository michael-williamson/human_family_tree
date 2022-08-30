import React, { useReducer, useContext } from "react";
import {
  speciesKeyObject,
  datesKeyObject,
  overlaysKeyObject,
} from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";

export const MapLegendContext = React.createContext();

export const MapLegendContextUpdater = React.createContext();

function mapLegendReducer(state, action) {
  if (action.type === "selectAll") {
    return { ...state, ...action.payload };
  }
  return { ...state, ...action.payload };
}

const mapLegendInitialState = {
  species: speciesKeyObject(),
  dates: datesKeyObject(),
  overlays: overlaysKeyObject(),
};

export function useMapLegendContext() {
  return useContext(MapLegendContext);
}

export function useMapLegendContextUpdater() {
  return useContext(MapLegendContextUpdater);
}

export const MapLegendStateProvider = ({ children }) => {
  const [mapLegendState, mapLegendDispatch] = useReducer(
    mapLegendReducer,
    mapLegendInitialState
  );
  return (
    <MapLegendContext.Provider value={mapLegendState}>
      <MapLegendContextUpdater.Provider value={mapLegendDispatch}>
        {children}
      </MapLegendContextUpdater.Provider>
    </MapLegendContext.Provider>
  );
};

import React, { useReducer, useContext, useState } from "react";
import {
  speciesKeyObject,
  datesKeyObject,
  overlaysKeyObject,
} from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";

export const MapLegendContext = React.createContext();
export const MapLegendContextUpdater = React.createContext();
export const MapLegendFieldHoverContext = React.createContext();
export const MapLegendFieldHoverContextUpdater = React.createContext();

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

export function useMapLegendFieldContext() {
  return useContext(MapLegendFieldHoverContext);
}

export function useMapLegendFieldContextUpdater() {
  return useContext(MapLegendFieldHoverContextUpdater);
}

export const MapLegendStateProvider = ({ children }) => {
  const [mapLegendState, mapLegendDispatch] = useReducer(
    mapLegendReducer,
    mapLegendInitialState
  );
  const [currentField, setCurrentField] = useState("");
  return (
    <MapLegendContext.Provider value={mapLegendState}>
      <MapLegendContextUpdater.Provider value={mapLegendDispatch}>
        <MapLegendFieldHoverContext.Provider value={currentField}>
          <MapLegendFieldHoverContextUpdater.Provider value={setCurrentField}>
            {children}
          </MapLegendFieldHoverContextUpdater.Provider>
        </MapLegendFieldHoverContext.Provider>
      </MapLegendContextUpdater.Provider>
    </MapLegendContext.Provider>
  );
};

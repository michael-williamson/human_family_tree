import React, { useReducer, useContext, useState } from "react";
import { speciesIconColorObjectFN } from "../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents";
import {
  speciesKeyObject,
  datesKeyObject,
  overlaysKeyObject,
} from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";
import specimensArray from "../../../Data/anthroData.json";
import { SELECT_ALL } from "../../../ConstantVariableNames";

export const MapLegendContext = React.createContext();
export const MapLegendContextUpdater = React.createContext();
export const MapLegendFieldHoverContext = React.createContext();
export const MapLegendFieldHoverContextUpdater = React.createContext();
export const MapLegendIconColorObject = React.createContext();

function mapLegendReducer(state, action) {
  if (action.type === SELECT_ALL) {
    return { ...state, ...action.payload };
  }
  return { ...state, ...action.payload };
}

const mapLegendInitialState = {
  species: speciesKeyObject(),
  dates: datesKeyObject(),
  overlays: overlaysKeyObject(),
};

const colorObject = speciesIconColorObjectFN(specimensArray, "species");

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

export function useMapLegendIconColorObjectContext() {
  return useContext(MapLegendIconColorObject);
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
            <MapLegendIconColorObject.Provider value={colorObject}>
              {children}
            </MapLegendIconColorObject.Provider>
          </MapLegendFieldHoverContextUpdater.Provider>
        </MapLegendFieldHoverContext.Provider>
      </MapLegendContextUpdater.Provider>
    </MapLegendContext.Provider>
  );
};

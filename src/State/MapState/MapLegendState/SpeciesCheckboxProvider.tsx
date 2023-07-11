import React, { Dispatch, useContext, useReducer, useState } from "react";
import { speciesKeyObject } from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";
import { reducer } from "../../../HelperFunctions/State/MapLegendState";

const initialState = speciesKeyObject();

const SpeciesCheckboxContext = React.createContext(initialState);
const SpeciesCheckboxContextUpdater = React.createContext({} as Dispatch<any>);

export const MapLegendFieldHoverContext = React.createContext("");
export const MapLegendFieldHoverContextUpdater = React.createContext(
  {} as Dispatch<any>
);

export function useSpeciesCheckbox() {
  return useContext(SpeciesCheckboxContext);
}

export function useSpeciesCheckboxUpdater() {
  return useContext(SpeciesCheckboxContextUpdater);
}

export function useMapLegendFieldContext() {
  return useContext(MapLegendFieldHoverContext);
}

export function useMapLegendFieldContextUpdater() {
  return useContext(MapLegendFieldHoverContextUpdater);
}

export const SpeciesCheckboxProvider = ({ children }: any) => {
  const [speciesCheckboxState, speciesCheckboxDispatch] = useReducer(
    reducer,
    initialState
  );
  const [currentField, setCurrentField] = useState("");
  return (
    <SpeciesCheckboxContext.Provider value={speciesCheckboxState}>
      <SpeciesCheckboxContextUpdater.Provider value={speciesCheckboxDispatch}>
        <MapLegendFieldHoverContext.Provider value={currentField}>
          <MapLegendFieldHoverContextUpdater.Provider value={setCurrentField}>
            {children}
          </MapLegendFieldHoverContextUpdater.Provider>
        </MapLegendFieldHoverContext.Provider>
      </SpeciesCheckboxContextUpdater.Provider>
    </SpeciesCheckboxContext.Provider>
  );
};

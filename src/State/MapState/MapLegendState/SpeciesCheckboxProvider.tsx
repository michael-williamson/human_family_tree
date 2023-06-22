import React, { Dispatch, useContext, useReducer } from "react";
import { speciesKeyObject } from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";
import { reducer } from "../../../HelperFunctions/State/MapLegendState";

const initialState = speciesKeyObject();

const SpeciesCheckboxContext = React.createContext(initialState);
const SpeciesCheckboxContextUpdater = React.createContext({} as Dispatch<any>);

export function useSpeciesCheckbox() {
  return useContext(SpeciesCheckboxContext);
}

export function useSpeciesCheckboxUpdater() {
  return useContext(SpeciesCheckboxContextUpdater);
}

export const SpeciesCheckboxProvider = ({ children }: any) => {
  const [speciesCheckboxState, speciesCheckboxDispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <SpeciesCheckboxContext.Provider value={speciesCheckboxState}>
      <SpeciesCheckboxContextUpdater.Provider value={speciesCheckboxDispatch}>
        {children}
      </SpeciesCheckboxContextUpdater.Provider>
    </SpeciesCheckboxContext.Provider>
  );
};

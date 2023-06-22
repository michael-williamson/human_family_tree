import React, { useContext, useReducer } from "react";
import { speciesKeyObject } from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";
import {
  providerControlFlow,
  reducer,
} from "../../../HelperFunctions/State/MapLegendState";
import { SPECIES } from "../../../ConstantVariableNames";

const initialState = speciesKeyObject();

const SpeciesCheckboxContext = React.createContext(initialState);
const SpeciesCheckboxContextUpdater = React.createContext({});

export function useSpeciesCheckbox() {
  return useContext(SpeciesCheckboxContext);
}

export function useSpeciesCheckboxUpdater() {
  return useContext(SpeciesCheckboxContextUpdater);
}

export const SpeciesCheckboxProvider = ({ children, action }: any) => {
  const [speciesCheckboxState, speciesCheckboxDispatch] = useReducer(
    reducer,
    initialState
  );

  providerControlFlow({
    state: speciesCheckboxState,
    action,
    providerCategory: SPECIES,
    dispatch: speciesCheckboxDispatch,
  });

  return (
    <SpeciesCheckboxContext.Provider value={speciesCheckboxState}>
      <SpeciesCheckboxContextUpdater.Provider value={speciesCheckboxDispatch}>
        {children}
      </SpeciesCheckboxContextUpdater.Provider>
    </SpeciesCheckboxContext.Provider>
  );
};

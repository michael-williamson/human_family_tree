import React, { useContext, useReducer } from "react";
import { speciesKeyObject } from "../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN/index";

const initialState = speciesKeyObject();

const SpeciesCheckboxContext = React.createContext(initialState);
const SpeciesCheckboxContextUpdater = React.createContext({});

export function useSpeciesCheckbox() {
  return useContext(SpeciesCheckboxContext);
}

export function useSpeciesCheckboxUpdater() {
  return useContext(SpeciesCheckboxContextUpdater);
}

function checkboxReducer(state: any, { payload }: any) {
  const { fieldName, bool } = payload;
  return {
    ...state,
    [fieldName]: !bool,
  };
}

export const SpeciesCheckboxProvider = ({ children }: any) => {
  const [speciesCheckboxState, speciesCheckboxDispatch] = useReducer(
    checkboxReducer,
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

import React, { useContext, useReducer } from "react";
import { overlaysKeyObject } from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";

const initialState = overlaysKeyObject();

const OverlaysCheckboxContext = React.createContext(initialState);
const OverlaysCheckboxContextUpdater = React.createContext({});

export function useOverlaysCheckbox() {
  return useContext(OverlaysCheckboxContext);
}

export function useOverlaysCheckboxUpdater() {
  return useContext(OverlaysCheckboxContextUpdater);
}

function checkboxReducer(state: any, { payload }: any) {
  const { fieldName, bool } = payload;
  return {
    ...state,
    [fieldName]: !bool,
  };
}

export const OverlaysCheckboxProvider = ({ children }: any) => {
  const [overlaysCheckboxState, overlaysCheckboxDispatch] = useReducer(
    checkboxReducer,
    initialState
  );
  return (
    <OverlaysCheckboxContext.Provider value={overlaysCheckboxState}>
      <OverlaysCheckboxContextUpdater.Provider value={overlaysCheckboxDispatch}>
        {children}
      </OverlaysCheckboxContextUpdater.Provider>
    </OverlaysCheckboxContext.Provider>
  );
};

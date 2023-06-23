import React, { Dispatch, useContext, useReducer } from "react";
import { overlaysKeyObject } from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";
import { reducer } from "../../../HelperFunctions/State/MapLegendState";

const initialState = overlaysKeyObject();

const OverlaysCheckboxContext = React.createContext(initialState);
const OverlaysCheckboxContextUpdater = React.createContext({} as Dispatch<any>);

export function useOverlaysCheckbox() {
  return useContext(OverlaysCheckboxContext);
}

export function useOverlaysCheckboxUpdater() {
  return useContext(OverlaysCheckboxContextUpdater);
}

export const OverlaysCheckboxProvider = ({ children }: any) => {
  const [overlaysCheckboxState, overlaysCheckboxDispatch] = useReducer(
    reducer,
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

import React, { Dispatch, useContext, useReducer } from "react";
import { datesKeyObject } from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";
import { reducer } from "../../../HelperFunctions/State/MapLegendState";

const initialState = datesKeyObject();

const DatesCheckboxContext = React.createContext(initialState);
const DatesCheckboxContextUpdater = React.createContext({} as Dispatch<any>);

export function useDatesCheckbox() {
  return useContext(DatesCheckboxContext);
}

export function useDatesCheckboxUpdater() {
  return useContext(DatesCheckboxContextUpdater);
}

export const DatesCheckboxProvider = ({ children }: any) => {
  const [datesCheckboxState, datesCheckboxDispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <DatesCheckboxContext.Provider value={datesCheckboxState}>
      <DatesCheckboxContextUpdater.Provider value={datesCheckboxDispatch}>
        {children}
      </DatesCheckboxContextUpdater.Provider>
    </DatesCheckboxContext.Provider>
  );
};

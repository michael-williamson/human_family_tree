import React, { useContext, useReducer } from "react";
import { datesKeyObject } from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";

const initialState = datesKeyObject();

const DatesCheckboxContext = React.createContext(initialState);
const DatesCheckboxContextUpdater = React.createContext({});

export function useDatesCheckbox() {
  return useContext(DatesCheckboxContext);
}

export function useDatesCheckboxUpdater() {
  return useContext(DatesCheckboxContextUpdater);
}

function checkboxReducer(state: any, { payload }: any) {
  const { fieldName, bool } = payload;
  return {
    ...state,
    [fieldName]: !bool,
  };
}

export const DatesCheckboxProvider = ({ children }: any) => {
  const [datesCheckboxState, datesCheckboxDispatch] = useReducer(
    checkboxReducer,
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

import React, { useContext, useReducer } from "react";
import { CLOSE_INFO_WINDOW } from "../../../ConstantVariableNames";

export const InfoWindowContext = React.createContext();
export const InfoWindowContextUpdater = React.createContext();

export function useInfoWindowContext() {
  return useContext(InfoWindowContext);
}

export function useInfoWindowContextUpdater() {
  return useContext(InfoWindowContextUpdater);
}

function infoWindowStateReducer(state, action) {
  if (action.type === CLOSE_INFO_WINDOW) {
    return { item: {} };
  }
  return action.payload;
}

export const InfoWindowStateProvider = ({ children }) => {
  // the model of the state object will be {item:{},typeOfMarker:""}
  const [state, dispatch] = useReducer(infoWindowStateReducer, { item: {} });
  return (
    <InfoWindowContext.Provider value={state}>
      <InfoWindowContextUpdater.Provider value={dispatch}>
        {children}
      </InfoWindowContextUpdater.Provider>
    </InfoWindowContext.Provider>
  );
};

import React, { useContext, useReducer, useCallback } from "react";
import {
  CLOSE_INFO_WINDOW,
  OPEN_INFO_WINDOW,
} from "../../../ConstantVariableNames";

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
    return { item: {}, typeOfMarker: "", closeWindow: true };
  }
  return action.payload;
}

export function useMarkerClickHandler(infoWindowContextUpdater) {
  return useCallback(
    (typeOfMarker, item) => () => {
      infoWindowContextUpdater({
        type: OPEN_INFO_WINDOW,
        payload: { typeOfMarker, item, closeWindow: false },
      });
    },
    [infoWindowContextUpdater]
  );
}

export const InfoWindowStateProvider = ({ children }) => {
  // the model of the state object will be {item:{},typeOfMarker:""}
  const [state, dispatch] = useReducer(infoWindowStateReducer, {
    item: {},
    typeOfMarker: "",
    closeWindow: true,
  });
  return (
    <InfoWindowContext.Provider value={state}>
      <InfoWindowContextUpdater.Provider value={dispatch}>
        {children}
      </InfoWindowContextUpdater.Provider>
    </InfoWindowContext.Provider>
  );
};

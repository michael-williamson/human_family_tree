import React, { useReducer, useContext, useState } from "react";
import {
  speciesKeyObject,
  datesKeyObject,
  overlaysKeyObject,
  eventsKeyObject,
  poiKeyObject,
} from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";

import {
  DATES,
  DESELECT_ALL,
  POINTS_OF_INTEREST,
  SELECT_ALL,
  SPECIES,
  SUBTRACT,
  ADD,
  ACTIVE_FIELD,
  ACTIVE_KEY,
} from "../../../ConstantVariableNames";
import { useNetworkRequestDispatch } from "./HTTPRequestStateProvider";
import { useArrayDispatchContext } from "./MapPopulationStateContext";

// The Map Legend Dispatch function is located in the MapKey.js Component,  if it is being updated it is happening there

export const MapLegendContext = React.createContext();
export const MapLegendContextUpdater = React.createContext();

export const MapLegendFieldHoverContext = React.createContext();
export const MapLegendFieldHoverContextUpdater = React.createContext();

export const relatedPropertiesArray = [SPECIES, DATES];

const mapLegendInitialState = {
  species: speciesKeyObject(),
  dates: datesKeyObject(),
  overlays: overlaysKeyObject(),
  events: eventsKeyObject(),
  [POINTS_OF_INTEREST]: poiKeyObject(),
  [ACTIVE_KEY]: null,
  [ACTIVE_FIELD]: null,
};

export function useMapLegendContext() {
  return useContext(MapLegendContext);
}

export function useMapLegendContextUpdater() {
  return useContext(MapLegendContextUpdater);
}

export function useMapLegendFieldContext() {
  return useContext(MapLegendFieldHoverContext);
}

export function useMapLegendFieldContextUpdater() {
  return useContext(MapLegendFieldHoverContextUpdater);
}

export const MapLegendStateProvider = ({ children }) => {
  const [mapLegendState, mapLegendDispatch] = useReducer(
    mapLegendReducer,
    mapLegendInitialState
  );
  const [currentField, setCurrentField] = useState("");

  const networkRequestDispatch = useNetworkRequestDispatch();
  const arrayDispatch = useArrayDispatchContext();

  const stateUpdateHandler = ({
    type,
    payload: { propertyName, fieldName },
  }) => {
    const bool = mapLegendState[propertyName][fieldName];
    const message = bool ? SUBTRACT : ADD;
    (function () {
      switch (message) {
        case SUBTRACT:
          return arrayDispatch({
            propertyName,
            message,
            fieldName,
            mapLegendState,
          });
        case ADD:
          return networkRequestDispatch({
            message,
            propertyName,
            fieldName,
            mapLegendState,
          });
        default:
          break;
      }
    })();

    const payload = {
      propertyName,
      fieldName,
    };
    mapLegendDispatch({ type, payload });
  };

  function mapLegendReducer(
    state,
    { type, payload: { propertyName, fieldName } }
  ) {
    if (type === SELECT_ALL || type === DESELECT_ALL) {
      const bool = type === SELECT_ALL;
      const obj = {};
      Object.keys(state[propertyName]).forEach(
        (eachProp) => (obj[eachProp] = bool)
      );

      return {
        ...state,
        [propertyName]: obj,
        [ACTIVE_FIELD]: null,
        [ACTIVE_KEY]: propertyName,
      };
    }

    // this is the case where an individual field is selected or deselected;  the values being passed:
    // -->  the statePropertyName e.g. species,dates,overlay, etc... ;  the itemProperty name which tells
    // --> the exact item to update ;

    // we grab the current value for this particular item which is a boolean
    //--> creating the stateUpdateObject is where we adjust the boolean value accordingly
    const bool = state[propertyName][fieldName];

    const stateUpdateObject = {
      ...state[propertyName],
      [fieldName]: !bool,
    };

    return {
      ...state,
      [propertyName]: stateUpdateObject,
      [ACTIVE_KEY]: propertyName,
      [ACTIVE_FIELD]: relatedPropertiesArray.find(
        (arrayItem) => arrayItem === propertyName
      )
        ? fieldName
        : null,
    };
  }

  return (
    <MapLegendContext.Provider value={mapLegendState}>
      <MapLegendContextUpdater.Provider value={stateUpdateHandler}>
        <MapLegendFieldHoverContext.Provider value={currentField}>
          <MapLegendFieldHoverContextUpdater.Provider value={setCurrentField}>
            {children}
          </MapLegendFieldHoverContextUpdater.Provider>
        </MapLegendFieldHoverContext.Provider>
      </MapLegendContextUpdater.Provider>
    </MapLegendContext.Provider>
  );
};

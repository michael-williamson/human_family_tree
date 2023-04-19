import React, { useReducer, useContext, useState, useEffect } from "react";
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
import { useMapLegendFieldsCountUpdater } from "../MapStateComponents/MapLegendFieldsCount";
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

  const fieldsCountUpdater = useMapLegendFieldsCountUpdater();
  const networkRequestDispatch = useNetworkRequestDispatch();
  const arrayDispatch = useArrayDispatchContext();

  useEffect(() => {
    // The constants (ACTIVE_KEY,ACTIVE_FIELD) relates to the actual property name on the mapLegendState
    // --> whereas the corresponding camel case variables are the actual values on these objects
    const activeKey = mapLegendState[ACTIVE_KEY];
    const activeField = mapLegendState[ACTIVE_FIELD];

    // update the specimens array only if properties contained in
    // --> relatedPropertiesArray
    const updateSpecimensArray = relatedPropertiesArray.find(
      (item) => item === activeKey
    );

    // the mapLegendState[ACTIVE_KEY] will equal null until a field is checked in the
    // --> Map legend...
    // since the MapLegendCountContext & SpecimensArrayContext only concerns the Dates & Species
    // --> we will only continue it the updateSpecimensArray variable is true
    if (activeKey === null || !updateSpecimensArray) return;

    if (
      mapLegendState[ACTIVE_FIELD] === null &&
      mapLegendState[ACTIVE_KEY] !== null
    ) {
      const type = Object.keys(mapLegendState[activeKey]).find(
        (item) => mapLegendState[activeKey][item] === true
      )
        ? SELECT_ALL
        : DESELECT_ALL;

      // fieldsCountUpdater({
      //   type,
      //   payload: {
      //     statePropertyName: activeKey,
      //     individualProperty: null,
      //     mapLegendState,
      //   },
      // });
    }
    if (mapLegendState[ACTIVE_FIELD] !== null) {
      const type = mapLegendState[activeKey][activeField] ? ADD : SUBTRACT;
      // fieldsCountUpdater({
      //   type,
      //   payload: {
      //     statePropertyName: activeKey,
      //     individualProperty: activeField,
      //     mapLegendState,
      //   },
      // });
    }

    return () => {};
  }, [mapLegendState, fieldsCountUpdater]);

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

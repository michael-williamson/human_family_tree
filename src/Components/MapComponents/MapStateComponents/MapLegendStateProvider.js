import React, { useReducer, useContext, useState, useEffect } from "react";
import { speciesIconColorObjectFN } from "../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents";
import {
  speciesKeyObject,
  datesKeyObject,
  overlaysKeyObject,
  eventsKeyObject,
  poiKeyObject,
} from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";

import specimensArray from "../../../Data/anthroData.json";
import {
  DATES,
  DESELECT_ALL,
  POINTS_OF_INTEREST,
  SELECT_ALL,
  SPECIES,
  SUBTRACT,
  ADD,
  UPDATING_INDIVIDUAL,
  ACTIVE_FIELD,
  ACTIVE_KEY,
} from "../../../ConstantVariableNames";
import { useSpecimensArrayContextUpdater } from "../MapStateComponents/SpecimensArrayStateProvider";
import {
  useMapLegendFieldsCountUpdater,
  useSynchronizedDataObjectContext,
} from "../MapStateComponents/MapLegendFieldsCount";

// The Map Legend Dispatch function is located in the MapKey.js Component,  if it is being updated it is happening there

export const MapLegendContext = React.createContext();
export const MapLegendContextUpdater = React.createContext();

export const MapLegendFieldHoverContext = React.createContext();
export const MapLegendFieldHoverContextUpdater = React.createContext();
export const MapLegendIconColorObject = React.createContext();

export const relatedPropertiesArray = [SPECIES, DATES];

function mapLegendReducer(
  state,
  { type, payload: { statePropertyName, item } }
) {
  if (type === SELECT_ALL || type === DESELECT_ALL) {
    const bool = type === SELECT_ALL;
    const obj = {};
    Object.keys(state[statePropertyName]).forEach(
      (eachProp) => (obj[eachProp] = bool)
    );

    return {
      ...state,
      [statePropertyName]: obj,
      [ACTIVE_FIELD]: null,
      [ACTIVE_KEY]: statePropertyName,
    };
  }

  // this is the case where an individual field is selected or deselected;  the values being passed:
  // -->  the statePropertyName e.g. species,dates,overlay, etc... ;  the itemProperty name which tells
  // --> the exact item to update ;

  // we grab the current value for this particular item which is a boolean
  //--> creating the stateUpdateObject is where we adjust the boolean value accordingly
  const bool = state[statePropertyName][item];

  const stateUpdateObject = {
    ...state[statePropertyName],
    [item]: !bool,
  };

  return {
    ...state,
    [statePropertyName]: stateUpdateObject,
    [ACTIVE_KEY]: statePropertyName,
    [ACTIVE_FIELD]: relatedPropertiesArray.find(
      (arrayItem) => arrayItem === statePropertyName
    )
      ? item
      : null,
  };
}

const mapLegendInitialState = {
  species: speciesKeyObject(),
  dates: datesKeyObject(),
  overlays: overlaysKeyObject(),
  events: eventsKeyObject(),
  [POINTS_OF_INTEREST]: poiKeyObject(),
  [ACTIVE_KEY]: null,
  [ACTIVE_FIELD]: null,
};

const colorObject = speciesIconColorObjectFN(specimensArray, "species");

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

export function useMapLegendIconColorObjectContext() {
  return useContext(MapLegendIconColorObject);
}

export const MapLegendStateProvider = ({ children }) => {
  const [mapLegendState, mapLegendDispatch] = useReducer(
    mapLegendReducer,
    mapLegendInitialState
  );
  const [currentField, setCurrentField] = useState("");

  const specimenArrayStateUpdater = useSpecimensArrayContextUpdater();
  const fieldsCountUpdater = useMapLegendFieldsCountUpdater();
  const synchronizedDataObject = useSynchronizedDataObjectContext();

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

      fieldsCountUpdater({
        type,
        payload: {
          statePropertyName: activeKey,
          individualProperty: null,
          mapLegendState,
          synchronizedDataObject,
        },
      });

      specimenArrayStateUpdater({
        type,
        payload: {
          mapLegendState: null,
          arr: null,
          individualBoolean: null,
        },
      });
    }
    if (mapLegendState[ACTIVE_FIELD] !== null) {
      const type = mapLegendState[activeKey][activeField] ? ADD : SUBTRACT;
      const arr = synchronizedDataObject[activeKey][activeField]["itemsArr"];
      fieldsCountUpdater({
        type,
        payload: {
          statePropertyName: activeKey,
          individualProperty: activeField,
          mapLegendState,
        },
      });

      specimenArrayStateUpdater({
        type: UPDATING_INDIVIDUAL,
        payload: {
          mapLegendState,
          arr,
          individualBoolean: mapLegendState[activeKey][activeField],
        },
      });
    }

    return () => {};
  }, [
    mapLegendState,
    specimenArrayStateUpdater,
    fieldsCountUpdater,
    synchronizedDataObject,
  ]);

  return (
    <MapLegendContext.Provider value={mapLegendState}>
      <MapLegendContextUpdater.Provider value={mapLegendDispatch}>
        <MapLegendFieldHoverContext.Provider value={currentField}>
          <MapLegendFieldHoverContextUpdater.Provider value={setCurrentField}>
            <MapLegendIconColorObject.Provider value={colorObject}>
              {children}
            </MapLegendIconColorObject.Provider>
          </MapLegendFieldHoverContextUpdater.Provider>
        </MapLegendFieldHoverContext.Provider>
      </MapLegendContextUpdater.Provider>
    </MapLegendContext.Provider>
  );
};

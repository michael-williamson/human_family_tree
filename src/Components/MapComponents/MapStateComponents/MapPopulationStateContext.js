import React, { useReducer, useContext, useCallback } from "react";
import {
  ADD,
  DATES,
  DESELECT_ALL,
  EVENTS,
  OVERLAYS,
  POINTS_OF_INTEREST,
  SELECT_ALL,
  SPECIES,
  SUBTRACT,
} from "../../../ConstantVariableNames";
import { reduceArray } from "../../../HelperFunctions/MapComponent/MapStateComponents/MapPopulationStateContext";
// This component will be responsible for maintaining all data structures associated with
//--> populating the map with markers & other content

const SpecimensArrayContext = React.createContext();
const EventArrayContext = React.createContext();
const OverlayArrayContext = React.createContext();
const EntryExitPointsArrayContext = React.createContext();
const SpeciesCountContext = React.createContext();
const DatesCountContext = React.createContext();
const ArrayDispatchContext = React.createContext();

export const useArrayDispatchContext = () => {
  return useContext(ArrayDispatchContext);
};

export const useSpecimensArrayContext = () => {
  return useContext(SpecimensArrayContext);
};

export const useEventArrayContext = () => {
  return useContext(EventArrayContext);
};

export const useOverlayArrayContext = () => {
  return useContext(OverlayArrayContext);
};

export const useEntryExitPointsArrayContext = () => {
  return useContext(EntryExitPointsArrayContext);
};

export const useSpeciesCountContext = () => {
  return useContext(SpeciesCountContext);
};

export const useDatesCountContext = () => {
  return useContext(DatesCountContext);
};

const stateReducer = (
  state,
  { message, fieldName, propertyName, arr, mapLegendState, individual }
) => {
  switch (message) {
    case SELECT_ALL:
      return [...arr];
    case DESELECT_ALL:
      return [];
    case ADD:
      return [
        ...state,
        ...reduceArray({ arr, propertyName, mapLegendState, individual }),
      ];
    case SUBTRACT:
      return reduceArray({ arr: state, fieldName, propertyName });
    default:
      break;
  }
};

export const MapPopulationStateContext = ({ children }) => {
  const [specimensArray, specimensArrayDispatch] = useReducer(stateReducer, []);
  const [eventArray, eventArrayDispatch] = useReducer(stateReducer, []);
  const [overlayArray, overlayArrayDispatch] = useReducer(stateReducer, []);
  const [entryExitPointsArray, entryExitPointsArrayDispatch] = useReducer(
    stateReducer,
    []
  );
  const handleStateUpdate = useCallback(
    ({ propertyName, message, arr, fieldName, mapLegendState }) => {
      // before possibly sending a changing reference to the reducer, mapLegendState is reassigned to a new object so that the reference passed to the
      // --> reducer function is isolated to this function's context to prevent any mutations that would otherwise be possible passing a state reference
      const speciesKeyState = mapLegendState && mapLegendState.species;
      const datesKeyState = mapLegendState && mapLegendState.dates;

      mapLegendState = mapLegendState && {
        [SPECIES]: { ...speciesKeyState },
        [DATES]: { ...datesKeyState },
      };

      switch (propertyName) {
        case SPECIES:
          return specimensArrayDispatch({
            message,
            fieldName,
            propertyName,
            arr,
            mapLegendState,
          });
        case DATES:
          return specimensArrayDispatch({
            message,
            fieldName,
            propertyName,
            arr,
            mapLegendState,
          });
        case EVENTS:
          return eventArrayDispatch({
            message,
            fieldName,
            propertyName,
            arr,
            individual: message,
          });
        case OVERLAYS:
          return overlayArrayDispatch({
            message,
            fieldName,
            propertyName,
            arr,
            individual: message,
          });
        case POINTS_OF_INTEREST:
          return entryExitPointsArrayDispatch({
            message,
            fieldName,
            propertyName,
            arr,
            individual: message,
          });
        default:
          break;
      }
    },
    []
  );

  return (
    <SpecimensArrayContext.Provider value={specimensArray}>
      <EventArrayContext.Provider value={eventArray}>
        <OverlayArrayContext.Provider value={overlayArray}>
          <EntryExitPointsArrayContext.Provider value={entryExitPointsArray}>
            <ArrayDispatchContext.Provider value={handleStateUpdate}>
              {children}
            </ArrayDispatchContext.Provider>
          </EntryExitPointsArrayContext.Provider>
        </OverlayArrayContext.Provider>
      </EventArrayContext.Provider>
    </SpecimensArrayContext.Provider>
  );
};

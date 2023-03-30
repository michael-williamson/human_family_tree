import React, { useReducer, useContext, useState, useEffect } from "react";
import specimensArray from "../../../Data/anthroData.json";
import {
  ADD,
  DATES,
  DESELECT_ALL,
  SELECT_ALL,
  SPECIES,
  SUBTRACT,
  UPDATING_INDIVIDUAL,
} from "../../../ConstantVariableNames";

import { itemPropertyCountObject } from "../../../HelperFunctions/MapComponent/MapKeyComponents";

const SpecimensArrayContext = React.createContext();
const SpecimensArrayUpdaterContext = React.createContext();
const SpecimensArraySpeciesCountContext = React.createContext();

export const useSpecimensArrayContext = () => useContext(SpecimensArrayContext);

export const useSpecimensArrayContextUpdater = () =>
  useContext(SpecimensArrayUpdaterContext);

export const useSpecimensArrayCountContext = () =>
  useContext(SpecimensArraySpeciesCountContext);

const speciesUpdater = (state, mapLegendState, arr = [], individualBoolean) => {
  // this function will run when the UPDATING_INDIVIDUAL message is received in the specimensArrayReducer.
  // --> the state will be the current specimens array; the mapLegendState will provide which items are checked or not
  // --> the arr will be from the synchronizedDataObject from the MapStateProvider.  The individualBoolean will be determined
  // --> by the last active checkbox in the Map Key.

  // if adding we add the specimens that are true in both the species key & the dates key.
  // --> For subtracting specimens we take the state & filter out specimens that don't meet both
  // ->> true criteria in the Map Key.
  const filteredArray = (bool) => {
    if (bool) {
      return arr.filter((item) => {
        return (
          mapLegendState[SPECIES][item.species] &&
          mapLegendState[DATES][item[DATES]]
        );
      });
    }

    return state.filter((item) => {
      return (
        mapLegendState[SPECIES][item[SPECIES]] &&
        mapLegendState[DATES][item[DATES]]
      );
    });
  };

  const type = individualBoolean ? ADD : SUBTRACT;

  switch (type) {
    case ADD:
      // adding to state array filteredArray
      return [...state, ...filteredArray(individualBoolean)];
    case SUBTRACT:
      // filtering out specimens from complete specimensArray state array
      return [...filteredArray(individualBoolean)];
    default:
      return [...state];
  }
};

const specimensArrayReducer = (
  state,
  { type, payload: { mapLegendState, arr, individualBoolean } }
) => {
  switch (type) {
    case SELECT_ALL:
      return [...specimensArray];
    case DESELECT_ALL:
      return [];
    case UPDATING_INDIVIDUAL:
      return speciesUpdater(state, mapLegendState, arr, individualBoolean);
    default:
      break;
  }
};

export const SpecimensArrayStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(specimensArrayReducer, specimensArray);
  const [speciesCount, setSpeciesCount] = useState(
    itemPropertyCountObject(state, SPECIES)
  );

  useEffect(() => {
    setSpeciesCount(itemPropertyCountObject(state, SPECIES));
  }, [state]);

  return (
    <SpecimensArrayContext.Provider value={state}>
      <SpecimensArrayUpdaterContext.Provider value={dispatch}>
        <SpecimensArraySpeciesCountContext.Provider value={speciesCount}>
          {children}
        </SpecimensArraySpeciesCountContext.Provider>
      </SpecimensArrayUpdaterContext.Provider>
    </SpecimensArrayContext.Provider>
  );
};

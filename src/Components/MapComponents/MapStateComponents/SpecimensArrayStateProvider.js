import React, { useReducer, useContext } from "react";
import specimensArray from "../../../Data/anthroData.json";
import {
  DATES,
  DESELECT_ALL,
  SELECT_ALL,
  SPECIES,
} from "../../../ConstantVariableNames";
import {
  addSelectedDate,
  addSelectedSpecies,
  subtractedSelectedDate,
  subtractedSelectedSpecies,
} from "../../../HelperFunctions/MapComponent/MapStateComponents";
import { itemPropertyCountObject } from "../../../HelperFunctions/MapComponent/MapKeyComponents";

const SpecimensArrayContext = React.createContext();
const SpecimensArrayUpdaterContext = React.createContext();
const SpecimensArraySpeciesCountContext = React.createContext();

export const useSpecimensArrayContext = () => useContext(SpecimensArrayContext);

export const useSpecimensArrayContextUpdater = () =>
  useContext(SpecimensArrayUpdaterContext);

export const useSpecimensArrayCountContext = () =>
  useContext(SpecimensArraySpeciesCountContext);

const filterFN = (arr) => {
  // here the original array is placed inside a closure to create only one reference b/c it
  // --> is a large array, also originalArrayPersisted represents an array inside of a closure
  // --> that persists across renders to circumvent needing duplicate date evaluations when a species
  // --> is checked true/false.
  let originalArray = arr;
  let originalArrayPersisted = arr;
  return (
    { propertyName: updatedProperty, prevStateCopy },
    { state, message, currentKeyItem }
  ) => {
    // creating a props object that allows passing same argument to each function
    // --> while using destructuring to inside the function to match corresponding parameters
    const props = { state, updatedProperty, prevStateCopy };
    // props.arr will pass the persisted array if necessary, & original array will only be referenced
    // --> the Individual Key checked was the Dates map key
    props.arr = originalArrayPersisted;
    currentKeyItem === DATES && (props.originalArray = originalArray);
    const checked =
      currentKeyItem && prevStateCopy[currentKeyItem][updatedProperty];
    // in the switch statement depending on conditions the originalArrayPersisted array
    // --> will need to updated
    switch (message) {
      case DATES:
        return (originalArrayPersisted = checked
          ? subtractedSelectedDate(props)
          : addSelectedDate(props)) && checked
          ? subtractedSelectedDate(props)
          : addSelectedDate(props);
      case SPECIES:
        return checked
          ? subtractedSelectedSpecies(props)
          : addSelectedSpecies(props);
      case SELECT_ALL:
        // if selecting all dates eval will be matching species that are checked & returning the
        // --> full original array b/c now the dates evaluated being all selected is the full original array.
        return (originalArrayPersisted =
          updatedProperty === DATES
            ? [...originalArray]
            : originalArrayPersisted && updatedProperty === DATES
            ? addSelectedDate({ ...props, selectAll: true })
            : addSelectedSpecies({ ...props, selectAll: true }));
      case DESELECT_ALL:
        return (
          (originalArrayPersisted =
            updatedProperty === DATES ? [] : originalArrayPersisted) && []
        );
      default:
    }
  };
};

const filterByFN = filterFN(specimensArray, specimensArray);

const specimensArrayReducer = (state, action) => {
  const filterInfoProps = {
    state,
  };
  switch (action.type) {
    case DATES:
      return [
        ...filterByFN(action.payload, {
          ...filterInfoProps,
          message: DATES,
          currentKeyItem: DATES,
        }),
      ];
    case SPECIES:
      return [
        ...filterByFN(action.payload, {
          ...filterInfoProps,
          message: SPECIES,
          currentKeyItem: SPECIES,
        }),
      ];
    case SELECT_ALL:
      return [
        ...filterByFN(action.payload, {
          ...filterInfoProps,
          message: SELECT_ALL,
        }),
      ];
    case DESELECT_ALL:
      return [
        ...filterByFN(action.payload, {
          ...filterInfoProps,
          message: DESELECT_ALL,
        }),
      ];
    default:
      break;
  }
};

export const SpecimensArrayStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(specimensArrayReducer, specimensArray);
  const countObject = itemPropertyCountObject(state, SPECIES);
  return (
    <SpecimensArrayContext.Provider value={state}>
      <SpecimensArrayUpdaterContext.Provider value={dispatch}>
        <SpecimensArraySpeciesCountContext.Provider value={countObject}>
          {children}
        </SpecimensArraySpeciesCountContext.Provider>
      </SpecimensArrayUpdaterContext.Provider>
    </SpecimensArrayContext.Provider>
  );
};

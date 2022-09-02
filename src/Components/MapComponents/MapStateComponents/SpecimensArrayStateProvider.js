import React, { useReducer, useContext } from "react";
import specimensArray from "../../../Data/anthroData.json";
import { DATES, SPECIES } from "../../../ConstantVariableNames";
import {
  addSelectedDate,
  addSelectedSpecies,
  subtractedSelectedDate,
  subtractedSelectedSpecies,
} from "../../../HelperFunctions/MapComponent/MapStateComponents";

const SpecimensArrayContext = React.createContext();
const SpecimensArrayUpdaterContext = React.createContext();

export const useSpecimensArrayContext = () => {
  return useContext(SpecimensArrayContext);
};

export const useSpecimensArrayContextUpdater = () => {
  return useContext(SpecimensArrayUpdaterContext);
};

const filterFN = (arr) => {
  let originalArray = arr;
  let originalArrayPersisted = arr;
  return (
    { propertyName: updatedProperty, prevStateCopy },
    state,
    currentKeyItem
  ) => {
    const props = { state, updatedProperty, prevStateCopy };
    props.arr = originalArrayPersisted;
    currentKeyItem === DATES && (props.originalArray = originalArray);
    const checked = prevStateCopy[currentKeyItem][updatedProperty];
    switch (currentKeyItem) {
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
      default:
    }
  };
};

const filterByFN = filterFN(specimensArray, specimensArray);

const specimensArrayReducer = (state, action) => {
  switch (action.type) {
    case DATES:
      return [...filterByFN(action.payload, state, DATES)];
    case SPECIES:
      return [...filterByFN(action.payload, state, SPECIES)];
    default:
      break;
  }
};

export const SpecimensArrayStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(specimensArrayReducer, specimensArray);
  return (
    <SpecimensArrayContext.Provider value={state}>
      <SpecimensArrayUpdaterContext.Provider value={dispatch}>
        {children}
      </SpecimensArrayUpdaterContext.Provider>
    </SpecimensArrayContext.Provider>
  );
};

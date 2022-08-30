import React, { useReducer, useContext } from "react";
import { datesCategoryObj } from "../../../HelperFunctions/General";
import specimensArray from "../../../Data/anthroData.json";

const SpecimensArrayContext = React.createContext();
const SpecimensArrayUpdaterContext = React.createContext();

export const useSpecimensArrayContext = () => {
  return useContext(SpecimensArrayContext);
};

export const useSpecimensArrayContextUpdater = () => {
  return useContext(SpecimensArrayUpdaterContext);
};

const filterByDate = (updatedProperty, state) => {
  state.filter((item) => {
    return (
      item.wholeNumberYears > datesCategoryObj[updatedProperty.dates].lesser &&
      item.wholeNumberYears < datesCategoryObj[updatedProperty.dates].greater
    );
  });
};
const filterBySpecies = (updatedProperty, state) => {
  if (state.some((item) => item.species === updatedProperty)) {
    return state.filter((item) => {
      return item.species !== updatedProperty;
    });
  }
  return [
    ...state,
    ...specimensArray.filter((item) => {
      return item.species === updatedProperty;
    }),
  ];
};

const specimensArrayReducer = (state, action) => {
  switch (action.type) {
    case "dates":
      return [...filterByDate(action.payload, state)];
    case "species":
      return [...filterBySpecies(action.payload, state)];
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

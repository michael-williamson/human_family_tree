import { SPECIES } from "../../../ConstantVariableNames";
import { datesCategoryObj } from "../../General";

// NOTE: Its important to distinguish that when adding we want to use greaterthan/lesserthan equalto to include the comparison dates
// --> & when subtracting we are excluding these greater/lesser dates b/c only dates that fall outside of these ranges evaluate as true
// --> & will be filtered in to the new state array
export const addSelectedDate = ({
  state,
  originalArray,
  updatedProperty,
  prevStateCopy,
  selectAll = false,
}) => {
  if (selectAll)
    return [
      ...state,
      ...originalArray.filter((item) => prevStateCopy.species[item.species]),
    ];
  const comparisonStatement = (item) =>
    item.wholeNumberYears >= datesCategoryObj[updatedProperty].lesser &&
    item.wholeNumberYears <= datesCategoryObj[updatedProperty].greater &&
    prevStateCopy.species[item.species];
  return [
    ...state,
    ...originalArray.filter((item) => comparisonStatement(item)),
  ];
};

export const subtractedSelectedDate = ({ state, updatedProperty }) => {
  //after testing remove curly braces and return logical OR
  const comparisonStatement = (item) =>
    item.wholeNumberYears < datesCategoryObj[updatedProperty].lesser ||
    item.wholeNumberYears > datesCategoryObj[updatedProperty].greater;

  return state.filter((item) => comparisonStatement(item));
};

export const addSelectedSpecies = ({
  state,
  arr,
  updatedProperty,
  selectAll = false,
}) => {
  if (selectAll) return [...state, ...arr];
  return [
    ...state,
    ...arr.filter((item) => {
      return item[SPECIES] === updatedProperty;
    }),
  ];
};

export const subtractedSelectedSpecies = ({ state, updatedProperty }) => {
  return state.filter((item) => {
    return item[SPECIES] !== updatedProperty;
  });
};

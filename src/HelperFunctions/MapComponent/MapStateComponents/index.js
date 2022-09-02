import { SPECIES } from "../../../ConstantVariableNames";
import { datesCategoryObj } from "../../General";

export const addSelectedDate = ({
  state,
  originalArray,
  updatedProperty,
  prevStateCopy,
}) => {
  const comparisonStatement = (item) =>
    item.wholeNumberYears > datesCategoryObj[updatedProperty].lesser &&
    item.wholeNumberYears < datesCategoryObj[updatedProperty].greater &&
    prevStateCopy.species[item.species];
  return [
    ...state,
    ...originalArray.filter((item) => comparisonStatement(item)),
  ];
};

export const subtractedSelectedDate = ({ state, updatedProperty }) => {
  const comparisonStatement = (item) =>
    item.wholeNumberYears < datesCategoryObj[updatedProperty].lesser ||
    item.wholeNumberYears > datesCategoryObj[updatedProperty].greater;
  return state.filter((item) => comparisonStatement(item));
};

export const addSelectedSpecies = ({ state, arr, updatedProperty }) => {
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

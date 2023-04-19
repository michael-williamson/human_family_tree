import {
  DATES,
  EVENTS,
  OVERLAYS,
  POINTS_OF_INTEREST,
  SPECIES,
  ADD,
  ENTRY_EXIT_POINTS,
} from "../../../../ConstantVariableNames";

export const reduceArray = ({
  arr,
  propertyName,
  fieldName,
  mapLegendState,
  individual,
}) => {
  if (individual === ADD) {
    return arr;
  }
  if (mapLegendState) {
    return arr.filter(
      (item) => mapLegendState[propertyName][item[propertyName]] === true
    );
  }
  return arr.filter((item) => item[propertyName] !== fieldName);
};

export const speciesPropertyObject = {
  propertyName: DATES,
};

export const datesPropertyObject = {
  propertyName: SPECIES,
};

export const otherThanSpecimensArray = [
  OVERLAYS,
  POINTS_OF_INTEREST,
  ENTRY_EXIT_POINTS,
  EVENTS,
];

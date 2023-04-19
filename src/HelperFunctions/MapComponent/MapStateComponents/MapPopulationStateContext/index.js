import {
  DATES,
  EVENTS,
  OVERLAYS,
  POINTS_OF_INTEREST,
  SPECIES,
  ADD,
  ENTRY_EXIT_POINTS,
} from "../../../../ConstantVariableNames";

export const speciesDatesPropertyObject = {
  [SPECIES]: DATES,
  [DATES]: SPECIES,
};

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
    propertyName = speciesDatesPropertyObject[propertyName];
    return arr.filter(
      (item) => mapLegendState[propertyName][item[propertyName]] === true
    );
  }

  return arr.filter((item) => item[propertyName] !== fieldName);
};

export const otherThanSpecimensArray = [
  OVERLAYS,
  POINTS_OF_INTEREST,
  ENTRY_EXIT_POINTS,
  EVENTS,
];

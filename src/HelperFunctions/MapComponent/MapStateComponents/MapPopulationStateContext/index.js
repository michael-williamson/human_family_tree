import {
  DATES,
  EVENTS,
  OVERLAYS,
  POINTS_OF_INTEREST,
  SPECIES,
  ADD,
  ENTRY_EXIT_POINTS,
  SUBTRACT,
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
  if (mapLegendState) {
    propertyName = speciesDatesPropertyObject[propertyName];
    return arr.filter(
      (item) => mapLegendState[propertyName][item[propertyName]] === true
    );
  }
  if (individual === ADD) {
    return [arr.find((item) => item.name === fieldName)];
  }
  if (individual === SUBTRACT) {
    return arr.filter((item) => item.name !== fieldName);
  }

  return arr.filter((item) => item[propertyName] !== fieldName);
};

export const otherThanSpecimensArray = [
  OVERLAYS,
  POINTS_OF_INTEREST,
  ENTRY_EXIT_POINTS,
  EVENTS,
];

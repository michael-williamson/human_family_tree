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
  // for now this 1st if statement will handle the specimens array state
  if (mapLegendState) {
    if (individual === ADD) {
      propertyName = speciesDatesPropertyObject[propertyName];
      return arr.filter(
        (item) => mapLegendState[propertyName][item[propertyName]] === true
      );
    }
    return arr.filter((item) => item[propertyName] !== fieldName);
  }

  // These 2 if statements will be handling the arrays that aren't the specimens arrays
  if (individual === ADD) {
    return [arr.find((item) => item.name === fieldName)];
  }
  if (individual === SUBTRACT) {
    return arr.filter((item) => item.name !== fieldName);
  }
};

export const otherThanSpecimensArray = [
  OVERLAYS,
  POINTS_OF_INTEREST,
  ENTRY_EXIT_POINTS,
  EVENTS,
];

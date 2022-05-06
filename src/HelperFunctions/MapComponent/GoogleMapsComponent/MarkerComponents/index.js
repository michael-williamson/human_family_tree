import { randomColorGenerator } from "../../../General";

export const speciesIconColorObjectFN = (array, itemProperty) => {
  const colorObject = {};
  array.forEach((item) => {
    if (colorObject[item[itemProperty]]) return null;
    else {
      colorObject[item[itemProperty]] = randomColorGenerator();
    }
  });
  return colorObject;
};

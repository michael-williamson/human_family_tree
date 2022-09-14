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

// This is a multiple scope function aimed at defining conditions via parameters in
// --> the first invocation, then capturing a specific value unique to a component that
// --> allow Google Map Markers to scale in size or "highlighted",  as well when highlighting
// --> operational animation will be set to false for more seamless renders
export const comparisonFN =
  (objComparison = false, propName = null, compValue) =>
  (value) => {
    if (objComparison) {
      return value[propName] === compValue;
    }
    return value === compValue;
  };

export const addIconOptionsFN =
  (addIconOptions = false, propValue, colorObject) =>
  (item) => {
    if (!addIconOptions) {
      return {};
    }

    return {
      fillColor: colorObject[item[propValue]],
      strokeColor: colorObject[item[propValue]],
    };
  };

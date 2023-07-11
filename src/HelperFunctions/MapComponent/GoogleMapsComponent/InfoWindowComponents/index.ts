import {
  CITY,
  CONTINENT,
  COUNTRY,
  DATE,
  ENTRY_EXIT_POINTS,
  EVENTS,
} from "../../../../ConstantVariableNames";

const generalPropertiesObj = {
  Location: CITY,
  Country: COUNTRY,
  Continent: CONTINENT,
};

const dateObj = {
  Date: DATE,
};

// This specifies which labels to use with each category of InfoWindow
// also using Object.keys() & its array to list labels its important
// to order labels how they are to be displayed ,  the value to each
// key represents the corresponding JSON property

export const typeOfMarkersObject = {
  species: {
    ...generalPropertiesObj,
    Species: "species",
    ...dateObj,
  },
  entryExitPoints: {
    "Point of Interest": "poiType",
    Description: "description",
  },
  events: {
    ...generalPropertiesObj,
    ...dateObj,
    Description: "description",
  },
  overlays: {
    Description: "description",
  },
};

// the following array & corresponding object solves the issue of paragraph style text
// by creating a method to identify which InfoWindows will have paragraph text
// & which properties specifically.

export const windowsWithParagraphs = [ENTRY_EXIT_POINTS, EVENTS];

export const paragraphTextFields:{[key:string]:any} = {
  Description: true,
};

export const styleExaminer = (item: string | number, defaultStyle: any, additionalStyles: any) => {
  if (paragraphTextFields[item] === undefined) {
    return defaultStyle;
  }
  return { ...defaultStyle, ...additionalStyles };
};

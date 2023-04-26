import {
  speciesArr,
  datesArr,
  overlaysArray,
  eventsArray,
} from "../../../General";

const arraysObject = {
  species: speciesArr,
  dates: datesArr,
  overlays: overlaysArray,
  events: eventsArray,
};

export const keyObject = (propName, bool = true) => {
  const object = {};
  arraysObject[propName].forEach((item) => {
    object[`${item}`] = bool;
  });

  if (object) return object;
};

export const speciesKeyObject = () => keyObject("species");

export const datesKeyObject = () => keyObject("dates");

export const overlaysKeyObject = () => keyObject("overlays");

export const eventsKeyObject = () => keyObject("events");

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

// $*$_tbg keyObject to be globalized
export const keyObject = (propName, value) => {
  const object = {};
  arraysObject[propName].forEach(item => {
    object[`${item}`] = value;
  });

  if (object) return object;
};

export const speciesKeyObject = () => keyObject("species", true);

export const datesKeyObject = () => keyObject("dates", true);

export const overlaysKeyObject = () => keyObject("overlays", true);

export const eventsKeyObject = () => keyObject("events", true);

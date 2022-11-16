import { POINTS_OF_INTEREST } from "../../../../ConstantVariableNames";
import {
  speciesArr,
  datesArr,
  overlaysArray,
  eventsArray,
  entryExitPointsArray,
} from "../../../General";

const arraysObject = {
  species: speciesArr,
  dates: datesArr,
  overlays: overlaysArray,
  events: eventsArray,
  [POINTS_OF_INTEREST]: entryExitPointsArray,
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

export const poiKeyObject = () => keyObject(POINTS_OF_INTEREST);

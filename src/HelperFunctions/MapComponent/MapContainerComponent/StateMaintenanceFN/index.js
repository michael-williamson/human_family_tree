import { speciesArr, datesArr, overlaysArray } from "../../../General";

const keyObject = (arr) => {
  const object = {};
  arr.forEach((item) => {
    object[`${item}`] = true;
  });

  if (object) return object;
};

export const speciesKeyObject = () => keyObject(speciesArr);

export const datesKeyObject = () => keyObject(datesArr);

export const overlaysKeyObject = () => keyObject(overlaysArray);

import { speciesArr, datesCatergory } from "../../data/listArrays";

export const speciesCheckedObject = () => {
  const obj = {};
  speciesArr.forEach((item) => {
    obj[`${item}`] = true;
  });

  return obj;
};

export const datesCheckedObject = () => {
  const obj = {};
  datesCatergory.forEach((item) => {
    obj[`${item}`] = true;
  });
  return obj;
};

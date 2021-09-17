import { speciesArr, datesCategoryProps } from "../../data/listArrays";

export const speciesCheckedObject = (bool) => {
  const obj = {};
  speciesArr.forEach((item) => {
    if (bool) obj[`${item}`] = true;
    else obj[`${item}`] = false;
  });

  return obj;
};

export const datesCheckedObject = (bool) => {
  const obj = {};
  datesCategoryProps.forEach((item) => {
    if (bool) obj[item] = true;
    else obj[item] = false;
  });
  return obj;
};

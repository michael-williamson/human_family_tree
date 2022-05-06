export const labelsArray = (arr, evalFN, itemProp) => {
  return arr.map((item) => evalFN(item[`${itemProp}`]));
};

export const labelsSorterReverse = (arr) => {
  return arr.sort((a, b) => a + b);
};

export const labelsSorterReverseWithProps = (arr, prop) => {
  return arr.sort((a, b) => a[`${prop}`] + b[`${prop}`]);
};

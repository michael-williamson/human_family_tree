export const filteredOutArray = (arr, filterItem, comparisonValue) => {
  return arr.filter((item) => {
    if (item.toString() === "[object Object]") {
      return item[comparisonValue] === filterItem;
    }
    return comparisonValue === filterItem;
  });
};

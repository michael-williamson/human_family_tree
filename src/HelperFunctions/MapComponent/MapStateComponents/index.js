import { DATES, SPECIES } from "../../../ConstantVariableNames";
import { datesCategoryObj } from "../../General";
import { v4 as uuidv4 } from "uuid";

// NOTE: Its important to distinguish that when adding we want to use greaterthan/lesserthan equalto to include the comparison dates
// --> & when subtracting we are excluding these greater/lesser dates b/c only dates that fall outside of these ranges evaluate as true
// --> & will be filtered in to the new state array
export const addSelectedDate = ({
  state,
  originalArray,
  updatedProperty,
  prevStateCopy,
  selectAll = false,
}) => {
  if (selectAll)
    return [
      ...state,
      ...originalArray.filter((item) => prevStateCopy.species[item.species]),
    ];
  const comparisonStatement = (item) =>
    item.wholeNumberYears >= datesCategoryObj[updatedProperty].lesser &&
    item.wholeNumberYears <= datesCategoryObj[updatedProperty].greater &&
    prevStateCopy.species[item.species];
  return [
    ...state,
    ...originalArray.filter((item) => comparisonStatement(item)),
  ];
};

export const subtractedSelectedDate = ({ state, updatedProperty }) => {
  //after testing remove curly braces and return logical OR
  const comparisonStatement = (item) =>
    item.wholeNumberYears < datesCategoryObj[updatedProperty].lesser ||
    item.wholeNumberYears > datesCategoryObj[updatedProperty].greater;

  return state.filter((item) => comparisonStatement(item));
};

export const addSelectedSpecies = ({
  state,
  arr,
  updatedProperty,
  selectAll = false,
}) => {
  if (selectAll) return [...state, ...arr];
  return [
    ...state,
    ...arr.filter((item) => {
      return item[SPECIES] === updatedProperty;
    }),
  ];
};

export const subtractedSelectedSpecies = ({ state, updatedProperty }) => {
  return state.filter((item) => {
    return item[SPECIES] !== updatedProperty;
  });
};

// step 1 the species array is our central data,  the date sorter & species sorter objects will all point there
// with this in mind add properties to each object such as an id for each; its corresponding date property or possibly that
// actual object!!;  this can be done while constructing the sorter objects

// step 2 When I select or deselect a field: lets start with species, when I deselect I want to examine that data array & subtract the count of dates associated
//

const addToDateObject = (datesObject, item, datesPropertiesArr) => {
  let index = 0;
  while (
    item.wholeNumberYears <= datesCategoryObj[datesPropertiesArr[index]].greater
  ) {
    if (
      item.wholeNumberYears <=
      datesCategoryObj[datesPropertiesArr[index]].lesser
    ) {
      index++;
      continue;
    }
    break;
  }

  item[DATES] = datesPropertiesArr[index];

  datesObject[datesPropertiesArr[index]]
    ? datesObject[datesPropertiesArr[index]].itemsArr.push(item)
    : (datesObject[datesPropertiesArr[index]] = { itemsArr: [item] });
};

const addCount = (obj) => {
  Object.keys(obj).forEach((item) => {
    obj[item].itemCount = obj[item].itemsArr.length;
    obj[item].totalItemCount = obj[item].itemsArr.length;
  });

  return obj;
};

const addToSpeciesObject = (speciesObject, item) => {
  speciesObject[item.species]
    ? speciesObject[item.species].itemsArr.push(item)
    : (speciesObject[item.species] = { itemsArr: [item] });
};

const idAssignment = (arr) => {
  const idObject = {};
  const datesObject = {};
  const speciesObject = {};
  const datesPropertiesArr = Object.keys(datesCategoryObj);
  arr.forEach((item) => {
    item["isChecked"] = true;
    const id = uuidv4();
    item.id = id;
    assignId(idObject, id, item);
    addToDateObject(datesObject, item, datesPropertiesArr);
    addToSpeciesObject(speciesObject, item);
  });

  addCount(datesObject);
  addCount(speciesObject);
  const workingObject = {
    idObject,
    [DATES]: datesObject,
    [SPECIES]: speciesObject,
  };

  // workingObject.updateDateObject = function (species, type) {
  //   const obj = {};
  //   const arr = this.speciesObject[species]["itemsArr"];
  //   arr.forEach((item) => (obj[item] ? obj[item]++ : (obj[item] = 1)));
  //   this.datesObject.updateCount(obj, type);
  // };

  // workingObject.datesObject.updateCount = function (obj, type) {
  //   const arr = Object.keys(obj);
  //   arr.forEach((item) => {
  //     type === ADD
  //       ? (this[item].itemCount = this[item].itemCount + obj[item])
  //       : (this[item].itemCount = this[item].itemCount - obj[item]);
  //   });
  // };

  return workingObject;
};

export const buildDataArray = (arr) => {
  const whatIsObject = idAssignment(arr);
  return whatIsObject;
};

export const createCountObject = (data, propertyNamesArray) => {
  const countObject = {};
  let propertyName = "";
  while (propertyNamesArray.length) {
    const obj = {};
    propertyName = propertyNamesArray.shift();
    const individualDataObject = data[propertyName];
    Object.keys(individualDataObject).forEach((item) => {
      const currentCount = individualDataObject[item]["itemCount"];
      obj[item] = currentCount;
    });
    countObject[propertyName] = obj;
  }
  return countObject;
};

const assignId = (obj, id, item) => {
  obj[id] = item;
};

export const mapKeyComparison =
  (dataObject) =>
  (state, individualKeyProperty, itemProperty, addOrSubtract) => {
    const arr = dataObject[individualKeyProperty][itemProperty].itemsArr;
    const whichProperty = individualKeyProperty === DATES ? SPECIES : DATES;
    const mapKeyObject = state[whichProperty];
    return arr.filter((item) => {
      // if I want to add items according to the state of the map key
      // --> the map key will need to be true
      // --. If I want to subtract
      return mapKeyObject[item[whichProperty]] === true;
    });
  };

export const selectDeselectCountHandler = () => {};

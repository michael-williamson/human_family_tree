import {
  ADD,
  DATES,
  ENTRY_EXIT_POINTS,
  ENTRY_EXIT_POINTS_ARRAY,
  EVENTS,
  EVENT_ARRAY,
  OVERLAYS,
  OVERLAY_ARRAY,
  SELECT_ALL,
  SPECIES,
  SPECIMENS_BY_DATE,
  SPECIMENS_BY_ID,
  SPECIMENS_BY_SPECIES,
} from "../../../ConstantVariableNames";
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
      ...originalArray.filter(item => prevStateCopy.species[item.species]),
    ];
  const comparisonStatement = item =>
    item.wholeNumberYears >= datesCategoryObj[updatedProperty].lesser &&
    item.wholeNumberYears <= datesCategoryObj[updatedProperty].greater &&
    prevStateCopy.species[item.species];
  return [...state, ...originalArray.filter(item => comparisonStatement(item))];
};

export const subtractedSelectedDate = ({ state, updatedProperty }) => {
  //after testing remove curly braces and return logical OR
  const comparisonStatement = item =>
    item.wholeNumberYears < datesCategoryObj[updatedProperty].lesser ||
    item.wholeNumberYears > datesCategoryObj[updatedProperty].greater;

  return state.filter(item => comparisonStatement(item));
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
    ...arr.filter(item => {
      return item[SPECIES] === updatedProperty;
    }),
  ];
};

export const subtractedSelectedSpecies = ({ state, updatedProperty }) => {
  return state.filter(item => {
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

const addCount = obj => {
  Object.keys(obj).forEach(item => {
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

const idAssignment = arr => {
  const idObject = {};
  const datesObject = {};
  const speciesObject = {};
  const datesPropertiesArr = Object.keys(datesCategoryObj);
  arr.forEach(item => {
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

  return workingObject;
};

export const buildDataArray = arr => {
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
    Object.keys(individualDataObject).forEach(item => {
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
  dataObject => (state, individualKeyProperty, itemProperty, addOrSubtract) => {
    const arr = dataObject[individualKeyProperty][itemProperty].itemsArr;
    const whichProperty = individualKeyProperty === DATES ? SPECIES : DATES;
    const mapKeyObject = state[whichProperty];
    return arr.filter(item => {
      // if I want to add items according to the state of the map key
      // --> the map key will need to be true
      // --. If I want to subtract
      return mapKeyObject[item[whichProperty]] === true;
    });
  };

export const selectDeselectCountHandler = () => {};

const matchingKeyValues = {
  [DATES]: [SPECIMENS_BY_DATE],
  [SPECIES]: [SPECIMENS_BY_SPECIES],
  [EVENTS]: [EVENT_ARRAY],
  [OVERLAYS]: [OVERLAY_ARRAY],
  [ENTRY_EXIT_POINTS]: [ENTRY_EXIT_POINTS_ARRAY],
};

const apiAddressesObject = {
  [SPECIES]: "api/specimensArray",
  [SPECIMENS_BY_DATE]: "api/specimensByDate",
  [SPECIMENS_BY_SPECIES]: "api/specimensBySpecies",
  [SPECIMENS_BY_ID]: "api/specimensById",
  [EVENTS]: "api/events",
  [OVERLAYS]: "api/overlays",
  [ENTRY_EXIT_POINTS]: "api/entryExitPoints",
};

export const devApiAddressesObject = {
  [SPECIMENS_BY_SPECIES]: "http://localhost:5000/api/specimensBySpecies",
  [SPECIMENS_BY_DATE]: "http://localhost:5000/api/specimensByDate",
};

export const selectAllAddressesObject = {
  [SPECIES]: "http://localhost:5000/api/specimensArray",
  [SPECIMENS_BY_DATE]: "http://localhost:5000/api/specimensByDate",
  [SPECIMENS_BY_SPECIES]: "http://localhost:5000/api/specimensBySpecies",
  [EVENTS]: "http://localhost:5000/api/events",
  [OVERLAYS]: "http://localhost:5000/api/overlays",
  [ENTRY_EXIT_POINTS]: "http://localhost:5000/api/entryExitPoints",
};

export const fetchArray =
  (axiosRef, arrayDispatchContext) =>
  ({ message, propertyName, fieldName, mapLegendState }) => {
    // action function found in helperfunctions folder
    const url = action({ message, propertyName, fieldName });
    // to update the specimens array with http requests we need to first make the request
    // --> then call the reducer / dispatch function within the context of the Promise to
    // --> capture the returned data & relay it to the context of the Specimens Array Context Provider
    // -->
    (async function () {
      const { status, data } = await axiosRef.current.get(url);
      if (status === 200 && Array.isArray(data)) {
        const arr = [...data];
        arrayDispatchContext({ message, propertyName, arr, mapLegendState });
      }
    })();
  };

export const action = ({ message, propertyName, fieldName }) => {
  message =
    propertyName === SPECIES || propertyName === DATES ? message : SELECT_ALL;
  switch (message) {
    case SELECT_ALL:
      return apiAddressesObject[propertyName];
    case ADD:
      return httpRequestParamHandler({ propertyName, fieldName });
    default:
      break;
  }
};

export const httpRequestParamHandler = ({ propertyName, fieldName }) => {
  const propName = matchingKeyValues[propertyName];
  if (fieldName) {
    const urlString = devApiAddressesObject[propName];
    return `${urlString}/${fieldName}`;
  }

  return apiAddressesObject[propertyName];
};

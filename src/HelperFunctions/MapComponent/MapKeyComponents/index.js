import {
  DATES,
  MOUSE_ENTER,
  MOUSE_LEAVE,
  SPECIES,
} from "../../../ConstantVariableNames";

export const speciesArr = [
  "habilis",
  "rudolfensis",
  "erectus",
  "floresiensis",
  "luzonensis",
  "antecessor",
  "heidelbergensis",
  "neanderthalensis",
  "denisovan",
  "Red Deer Cave People",
  "sapiens",
  "longi",
];

export const selectOrDeselectFN = (checkboxState) => {
  // if 3 or more checkboxes are false the only option is to select all & by
  // --> this function returning true tells the IndividualKey Component
  // --> to list the "SELECT ALL" option & vice versa, the other message
  // --> sent by returning true is that a click event tells the SpecimensArrayStateContext
  // --> to evaluate this new condition, this of course is the exact opposite
  // --> if false and "DESELECT ALL" are the command
  return (
    Object.values(checkboxState).filter((item) => item === false).length >= 3
  );
};

// hover function used by components: ClassList,CheckListComponent.
// avoids cluttered MapKey component by allowing import rather than
//--> passing down the function instance.  Also by returning anonymous
//--> functions ()=>()=> values can persist and be added as they become
//--> available in children components.  This allows some level of
//--> abstraction & adds dynamics.
export const handleHover = (contextFN) => (value) => (e) => {
  const { type } = e;
  let arg;
  switch (type) {
    case MOUSE_ENTER:
      arg = value;
      break;
    case MOUSE_LEAVE:
      arg = null;
      break;
    default:
      arg = null;
  }

  contextFN(arg);
};

// allows passing an event object only to Components
// --> correlated to functionality.  Evaluation occurs
// --> in the IndividualKeys Component.
export const eventObjectArrayNames = [SPECIES];

export const objectEval = (obj, label) => {
  const objCopy = { ...obj };
  const length = Object.keys(objCopy).length;
  if (length === 0) return {};
  for (const prop in objCopy) {
    objCopy[prop] = objCopy[prop](label);
  }
  return objCopy;
};

// function that creates an object with key/values representing recurring similarities in array objects
// --> & creating a count based on criteria
export const itemPropertyCountObject = (arr = [], propertyToCount) => {
  const countObject = {};
  arr.forEach((item) =>
    countObject[item[propertyToCount]]
      ? countObject[item[propertyToCount]]++
      : (countObject[item[propertyToCount]] = 1)
  );
  return countObject;
};

// array to determine which IndividualKey Components to use itemPropertyCountObject
export const keysToCountArray = [SPECIES, DATES];

// This will serve as the formatted Object created from anthroData.json
// --> & will be the central data object Application wide
// --> There are some properties in the json object that require functionality such as
// --> regular expressions.  It will be easier to handle this on load so that the overall
// --> specimens array will stay unchanged throughout runtime
export const specimensArrayFormatter = (arr) => {
  const specimensArray = [...arr];

  const regex = /<a[^>]*>(?<textBetween>[^<]+)<\/a>/gi;

  const imageAttributesArray = (string) => {
    return string.matchAll(regex);
  };

  specimensArray.forEach((item) => {
    item.imageAttributesArray = [];
    if (typeof item.linksToPhotos[2] === "string") {
      const regexMatches = imageAttributesArray(item.linksToPhotos[2]);
      for (const match of regexMatches) {
        item.imageAttributesArray.push(match.groups.textBetween);
      }
    }
  });

  return specimensArray;
};

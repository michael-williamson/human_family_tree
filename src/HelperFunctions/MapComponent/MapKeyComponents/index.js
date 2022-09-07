import {
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
      arg = "";
      break;
    default:
      arg = "";
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

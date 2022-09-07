import { MOUSE_ENTER, MOUSE_LEAVE } from "../../../ConstantVariableNames";

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

export const handleHover = (contextFN) => (value) => (e) => {
  const { type } = e;
  console.log(type, "type happened");
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

export const objectEval = (obj, label) => {
  const objCopy = { ...obj };
  const length = Object.keys(objCopy).length;
  if (length === 0) return {};
  for (const prop in objCopy) {
    objCopy[prop] = objCopy[prop](label);
  }
  return objCopy;
};

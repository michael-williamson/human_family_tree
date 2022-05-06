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

import React from "react";
import { CheckboxSpeciesComp } from "./CheckboxSpeciesComp";
import MapComponent from "./MapComponent";
import { speciesArr, datesCatergory } from "../data/listArrays";
import { CheckboxDatesComp } from "./CheckboxDatesComp";
import { styles as mapPageStyles } from "./componentStyle/MapPageStyles";

const { mainCheckboxContainer } = mapPageStyles;

export const MapPage = () => {
  const speciesCheckedObject = () => {
    const obj = {};
    speciesArr.forEach((item) => {
      obj[`${item}`] = true;
    });

    return obj;
  };

  const datesCheckedObject = () => {
    const obj = {};
    datesCatergory.forEach((item) => {
      obj[`${item}`] = true;
    });
    return obj;
  };

  const [speciesChecked, setSpeciesChecked] = React.useState(
    speciesCheckedObject()
  );
  const [datesChecked, setDatesChecked] = React.useState(datesCheckedObject());

  const handleChange = (event) => {
    setSpeciesChecked({
      ...speciesChecked,
      [event.target.name]: event.target.checked,
    });
  };
  const handleDateChange = (event) => {
    setDatesChecked({
      ...datesChecked,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <div>
      <div style={mainCheckboxContainer}>
        <CheckboxSpeciesComp
          handleChange={handleChange}
          speciesChecked={speciesChecked}
        />
        <CheckboxDatesComp
          datesChecked={datesChecked}
          handleDateChange={handleDateChange}
        />
      </div>
      <MapComponent
        speciesChecked={speciesChecked}
        datesChecked={datesChecked}
      />
    </div>
  );
};

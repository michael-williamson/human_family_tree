import React from "react";
import MapComponent from "./MapComponent";
import { CheckboxComp } from "../reusableComponents/CheckboxComp";
import { speciesArr, datesCatergory } from "../../data/listArrays";
//from helper functions
import { speciesCheckedObject, datesCheckedObject } from "../helperFunctions";
import { styles as mapPageStyles } from "../componentStyle/MapPageStyles";
import AccordionComp from "../reusableComponents/AccordionComp";
import { Typography } from "@material-ui/core";
const { mainCheckboxContainer } = mapPageStyles;

export const MapPage = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const [speciesChecked, setSpeciesChecked] = React.useState(
    speciesCheckedObject()
  );
  const [datesChecked, setDatesChecked] = React.useState(datesCheckedObject());

  const handleSpeciesChange = (event) => {
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

  const MainCheckboxContainer = (
    <div style={mainCheckboxContainer}>
      <CheckboxComp
        handleChange={handleSpeciesChange}
        checked={speciesChecked}
        sortBy={"Sort by Species"}
        mapArr={speciesArr}
      />
      <CheckboxComp
        checked={datesChecked}
        handleChange={handleDateChange}
        sortBy={"Sort by Date"}
        mapArr={datesCatergory}
      />
    </div>
  );

  const accordionSummaryComponent = (
    <Typography variant="h5" color="primary">
      {expanded ? "Sorting" : "Click to Sort Map"}
    </Typography>
  );

  return (
    <div>
      <AccordionComp
        expanded={expanded}
        setExpanded={setExpanded}
        index={0}
        accordionDetails={MainCheckboxContainer}
        accordionSummary={accordionSummaryComponent}
      />
      <MapComponent
        speciesChecked={speciesChecked}
        datesChecked={datesChecked}
      />
    </div>
  );
};

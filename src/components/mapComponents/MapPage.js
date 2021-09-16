import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import { CheckboxComp } from "../reusableComponents/CheckboxComp";
import { speciesArr, datesCatergoryProps } from "../../data/listArrays";
//from helper functions
import { speciesCheckedObject, datesCheckedObject } from "../helperFunctions";
import { styles as mapPageStyles } from "../componentStyle/MapPageStyles";
import AccordionComp from "../reusableComponents/AccordionComp";
import { Typography, Button, makeStyles, Grid } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const { mainCheckboxContainer } = mapPageStyles;

export const MapPage = () => {
  const [expanded, setExpanded] = useState("");

  const [speciesChecked, setSpeciesChecked] = useState(
    speciesCheckedObject(true)
  );
  const [datesChecked, setDatesChecked] = useState(datesCheckedObject(true));
  const [selectAllSpecies, setSelectAllSpecies] = useState(true);
  const [selectAllDates, setSelectAllDates] = useState(true);

  useEffect(() => {
    for (const prop in speciesChecked) {
      if (!speciesChecked[prop]) setSelectAllSpecies(false);
      else setSelectAllSpecies(true);
    }
  }, [speciesChecked]);

  useEffect(() => {
    for (const prop in datesChecked) {
      if (!datesChecked[prop]) setSelectAllDates(false);
      else setSelectAllDates(true);
    }
  }, [datesChecked]);

  const useStyles = makeStyles({
    root: {
      position: "absolute",
    },
  });

  const classes = useStyles();

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

  const handleSelectAll = (prop) => {
    if (prop === "species" && !selectAllSpecies) {
      setSpeciesChecked(speciesCheckedObject(true));
    } else if (prop === "species" && selectAllSpecies) {
      setSpeciesChecked(speciesCheckedObject(false));
    }
    if (prop === "dates" && !selectAllDates) {
      setDatesChecked(datesCheckedObject(true));
    } else if (prop === "dates" && selectAllDates) {
      setDatesChecked(datesCheckedObject(false));
    }
  };

  const MainCheckboxContainer = (
    <div style={mainCheckboxContainer}>
      <CheckboxComp
        handleChange={handleSpeciesChange}
        checked={speciesChecked}
        sortBy={"Sort by Species"}
        mapArr={speciesArr}
        selectAllBtn={
          <Button
            onClick={() => handleSelectAll("species")}
            className={classes.root}
            variant="outlined"
            color="primary"
            size="small"
          >
            {selectAllSpecies ? "deselect all" : "select all"}
          </Button>
        }
      />
      <CheckboxComp
        checked={datesChecked}
        handleChange={handleDateChange}
        sortBy={"Sort by Date"}
        mapArr={datesCatergoryProps}
        selectAllBtn={
          <Button
            onClick={() => handleSelectAll("dates")}
            className={classes.root}
            variant="outlined"
            color="primary"
            size="small"
          >
            {selectAllDates ? "deselect all" : "select all"}
          </Button>
        }
      />
    </div>
  );

  const accordionSummaryComponent = (
    <Grid container direction="row" alignItems="center">
      <Typography variant="h5" color="primary">
        {expanded ? "Sorting" : "Click to Sort Map"}
      </Typography>
      <CheckBoxIcon color="primary" fontSize="medium" />
    </Grid>
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

import React, { useState } from "react";
import MapComponent from "./MapComponent";
import AccordionComp from "../reusableComponents/AccordionComp";
import { Typography, Grid } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { MainCheckboxContainer } from "./MainCheckboxContainer";
import { speciesCheckedObject, datesCheckedObject } from "../helperFunctions";
import { TimeLineEventsComponent } from "./TimeLineEventsComponent";

export const MapPage = () => {
  const [speciesDateExpanded, setSpeciesDateExpanded] = useState("");
  const [timeLineEventsExpanded, setTimeLineEventsExpanded] = useState(false);
  const [speciesChecked, setSpeciesChecked] = useState(
    speciesCheckedObject(true)
  );
  const [datesChecked, setDatesChecked] = useState(datesCheckedObject(true));
  const [greenSaharaChecked, setGreenSaharaChecked] = useState(
    datesCheckedObject(true)
  );
  const [greenArabiaChecked, setGreenArabiaChecked] = useState(
    datesCheckedObject(true)
  );

  const [arabiaPolygon, setArabiaPolygon] = useState(false);
  const [saharaPolygon, setSaharaPolygon] = useState(false);

  const AccordionSummaryComponent = (props) => {
    const { expanded, toggleTextExpanded, toggleTextCollapsed } = props;
    return (
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h5" color="primary">
            {expanded ? toggleTextExpanded : toggleTextCollapsed}
          </Typography>
        </Grid>
        <Grid item>
          <CheckBoxIcon color="primary" fontSize="medium" />
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <AccordionComp
        expanded={timeLineEventsExpanded}
        setExpanded={setTimeLineEventsExpanded}
        index={0}
        children={{
          AccordionDetailsChild: (
            <TimeLineEventsComponent
              item1="Green Sahara Time Periods"
              item2="Green Arabia Time Periods"
              checkedState1={greenSaharaChecked}
              checkedState2={greenArabiaChecked}
              setCheckedState1={setGreenSaharaChecked}
              setCheckedState2={setGreenArabiaChecked}
              showComponent1={saharaPolygon}
              setShowComponent1={setSaharaPolygon}
              showComponent2={arabiaPolygon}
              setShowComponent2={setArabiaPolygon}
            />
          ),
          AccordionSummaryChild: (
            <AccordionSummaryComponent
              expanded={timeLineEventsExpanded}
              toggleTextExpanded="Choose Timeline Events"
              toggleTextCollapsed="Click to choose Timeline Events"
            />
          ),
        }}
      />
      <AccordionComp
        expanded={speciesDateExpanded}
        setExpanded={setSpeciesDateExpanded}
        index={0}
        children={{
          AccordionDetailsChild: (
            <MainCheckboxContainer
              species="Sort by Species"
              dates="Sort by Dates"
              speciesChecked={speciesChecked}
              setSpeciesChecked={setSpeciesChecked}
              datesChecked={datesChecked}
              setDatesChecked={setDatesChecked}
            />
          ),
          AccordionSummaryChild: (
            <AccordionSummaryComponent
              expanded={speciesDateExpanded}
              toggleTextExpanded="Sorting"
              toggleTextCollapsed="Click to Sort Map"
            />
          ),
        }}
      />
      <MapComponent
        speciesChecked={speciesChecked}
        datesChecked={datesChecked}
        setSpeciesChecked={setSpeciesChecked}
        setDatesChecked={setDatesChecked}
        saharaPolygon={saharaPolygon}
        arabiaPolygon={arabiaPolygon}
      />
    </div>
  );
};

import React, { useState, useMemo } from "react";
import MapComponent from "./MapComponent";
import AccordionComp from "../reusableComponents/AccordionComp";
import { Typography, Grid } from "@material-ui/core";
import { MainCheckboxContainer } from "./MainCheckboxContainer";
import { checkedObject } from "../helperFunctions";
import { TimeLineEventsComponent } from "./TimeLineEventsComponent";
import {
  datesCategoryProps,
  greenArabiaDates,
  greenSaharaDates,
  iceAgeDatesArr,
  speciesArr,
} from "../../data/listArrays";
import { AlarmOutlined, PublicOutlined } from "@material-ui/icons";

const MapPage = () => {
  // const [speciesDateExpanded, setSpeciesDateExpanded] = useState(false);
  // const [timeLineEventsExpanded, setTimeLineEventsExpanded] = useState(false);
  const [speciesChecked, setSpeciesChecked] = useState(
    checkedObject(true, speciesArr)
  );
  const [datesChecked, setDatesChecked] = useState(
    checkedObject(true, datesCategoryProps)
  );

  const [greenSaharaChecked, setGreenSaharaChecked] = useState(
    checkedObject(true, greenSaharaDates)
  );
  const [greenArabiaChecked, setGreenArabiaChecked] = useState(
    checkedObject(true, greenArabiaDates)
  );

  const [iceAgeChecked, setIceAgeChecked] = useState(
    checkedObject(false, iceAgeDatesArr)
  );
  const [northAmericanPolygon, setNorthAmericanPolygon] = useState(false);
  const [europeanPolygon, setEuropeanPolygon] = useState(false);

  const [arabiaPolygon, setArabiaPolygon] = useState(false);
  const [saharaPolygon, setSaharaPolygon] = useState(false);

  useMemo(() => {
    const arrVals = Object.values(iceAgeChecked);
    setNorthAmericanPolygon(arrVals.find((item) => item === true));
    setEuropeanPolygon(arrVals.find((item) => item === true));
  }, [iceAgeChecked]);

  const AccordionSummaryComponent = (props) => {
    const { expanded, toggleTextExpanded, toggleTextCollapsed, whichSummary } =
      props;
    return (
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item>
          {whichSummary !== "map" ? (
            <AlarmOutlined color="primary" />
          ) : (
            <PublicOutlined color="primary" />
          )}
        </Grid>
        <Grid item>
          <Typography variant="h5" color="primary">
            {expanded ? toggleTextExpanded : toggleTextCollapsed}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <AccordionComp
        index={0}
        children={{
          AccordionDetailsChild: (
            <TimeLineEventsComponent
              item1="Green Sahara Time Periods"
              item2="Green Arabia Time Periods"
              item3="Ice Age Time Periods"
              checkedState1={greenSaharaChecked}
              checkedState2={greenArabiaChecked}
              checkedState3={iceAgeChecked}
              setCheckedState1={setGreenSaharaChecked}
              setCheckedState2={setGreenArabiaChecked}
              setCheckedState3={setIceAgeChecked}
              showComponent1={saharaPolygon}
              setShowComponent1={setSaharaPolygon}
              showComponent2={arabiaPolygon}
              setShowComponent2={setArabiaPolygon}
              showComponent3={northAmericanPolygon}
              setShowComponent3={setNorthAmericanPolygon}
              showComponent4={europeanPolygon}
              setShowComponent4={setEuropeanPolygon}
              datesChecked={datesChecked}
              setDatesChecked={setDatesChecked}
            />
          ),
          AccordionSummaryChild: (
            <AccordionSummaryComponent
              // expanded={timeLineEventsExpanded}
              toggleTextExpanded="Choose Timeline Events"
              toggleTextCollapsed="Click to choose Timeline Events"
              whichSummary="timeline"
            />
          ),
        }}
      />
      <AccordionComp
        index={1}
        children={{
          AccordionDetailsChild: (
            <MainCheckboxContainer
              species="Sort by Species"
              dates="Sort by Dates"
              speciesChecked={speciesChecked}
              setSpeciesChecked={setSpeciesChecked}
              datesChecked={datesChecked}
              setDatesChecked={setDatesChecked}
              iceAgeChecked={iceAgeChecked}
              setIceAgeChecked={setIceAgeChecked}
            />
          ),
          AccordionSummaryChild: (
            <AccordionSummaryComponent
              // expanded={speciesDateExpanded}
              toggleTextExpanded="Sorting"
              toggleTextCollapsed="Click to Sort Map"
              whichSummary="map"
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
        northAmericanPolygon={northAmericanPolygon}
        europeanPolygon={europeanPolygon}
      />
    </div>
  );
};

export default MapPage;

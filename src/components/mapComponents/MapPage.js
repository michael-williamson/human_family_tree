import React, { useState, useMemo } from "react";
import MapComponent from "./MapComponent";
import AccordionComp from "../reusableComponents/AccordionComp";
import { Typography, Grid } from "@material-ui/core";
import { MainCheckboxContainer } from "./MainCheckboxContainer";
import { checkedObject } from "../helperFunctions";
import { TimeLineEventsComponent } from "./TimeLineEventsComponent";
import {
  datesCategoryProps,
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

  const [iceAgeChecked, setIceAgeChecked] = useState(
    checkedObject(false, iceAgeDatesArr)
  );

  const [iceAgeEnabled, setIceAgeEnabled] = useState(true);

  const [northAmericanPolygon, setNorthAmericanPolygon] = useState(false);
  const [europeanPolygon, setEuropeanPolygon] = useState(false);

  const [desertPolygon, setDesertPolygon] = useState({
    greenSahara: false,
    greenArabia: false,
  });

  useMemo(() => {
    if (!iceAgeEnabled) {
      setNorthAmericanPolygon(false);
      setEuropeanPolygon(false);
    } else if (iceAgeEnabled) {
      setIceAgeChecked({ ...iceAgeChecked });
    }
  }, [iceAgeEnabled]);

  useMemo(() => {
    if (iceAgeEnabled === false) return null;
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
              item1="Green Sahara"
              item2="Green Arabia"
              item3="Ice Age Time Periods"
              checkedState3={iceAgeChecked}
              setCheckedState3={setIceAgeChecked}
              iceAgeEnabled={iceAgeEnabled}
              setIceAgeEnabled={setIceAgeEnabled}
              showComponent1={desertPolygon}
              setShowComponent1={setDesertPolygon}
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
        desertPolygon={desertPolygon}
        northAmericanPolygon={northAmericanPolygon}
        europeanPolygon={europeanPolygon}
      />
    </div>
  );
};

export default MapPage;

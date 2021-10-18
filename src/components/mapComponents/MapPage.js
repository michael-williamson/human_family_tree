import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import AccordionComp from "../reusableComponents/AccordionComp";
import { Box, Grid } from "@material-ui/core";
import { MainCheckboxContainer } from "./MainCheckboxContainer";
import { checkedObject, datesCorrespondingDataObj } from "../helperFunctions";
import { TimeLineEventsComponent } from "./TimeLineEventsComponent";
import {
  datesCategoryProps,
  iceAgeDatesArr,
  speciesArr,
} from "../../data/listArrays";

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
    checkedObject(true, iceAgeDatesArr)
  );

  const [datesCorrespondingData, setDatesCorrespondingData] = useState(
    datesCorrespondingDataObj()
  );

  const [iceAgeEnabled, setIceAgeEnabled] = useState(true);

  const [northAmericanPolygon, setNorthAmericanPolygon] = useState(false);
  const [europeanPolygon, setEuropeanPolygon] = useState(false);

  const [desertPolygon, setDesertPolygon] = useState({
    greenSahara: false,
    greenArabia: false,
  });

  //state to control animation play state of TimeLineComponent
  const [playState, setPlayState] = useState({
    greenSahara: "paused",
    greenArabia: "paused",
    iceAge: "paused",
  });

  useEffect(() => {
    if (iceAgeEnabled === false) {
      setNorthAmericanPolygon(false);
      setEuropeanPolygon(false);
      return null;
    }
    const arrVals = Object.values(iceAgeChecked);
    setNorthAmericanPolygon(arrVals.find((item) => item === true));
    setEuropeanPolygon(arrVals.find((item) => item === true));
  }, [iceAgeChecked, iceAgeEnabled]);

  const AccordionSummaryComponent = (props) => {
    const { expanded, toggleTextExpanded, toggleTextCollapsed } = props;
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item>
          <Box letterSpacing={2} color="primary" fontWeight="bold">
            {expanded ? toggleTextExpanded : toggleTextCollapsed}
          </Box>
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
              playState={playState}
              setPlayState={setPlayState}
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
              datesCorrespondingData={datesCorrespondingData}
              setDatesCorrespondingData={setDatesCorrespondingData}
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
              datesCorrespondingData={datesCorrespondingData}
              setDatesCorrespondingData={setDatesCorrespondingData}
              setPlayState={setPlayState}
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

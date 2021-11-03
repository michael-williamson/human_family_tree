import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import { AccordionComponent } from "../reusableComponents/AccordionComponent";
import { Box, Grid } from "@material-ui/core";
import { MainCheckboxContainer } from "./MainCheckboxContainer";
import { checkedObject, comparatorIceAgeDates } from "../helperFunctions";
import { TimeLineEventsComponent } from "./TimeLineEventsComponent";
import {
  datesCategoryProps,
  datesCategoryObj,
  iceAgeDatesArr,
  speciesArr,
  europeanGlacialTimelineGreater,
} from "../../data/listArrays";

const MapPage = () => {
  const [speciesChecked, setSpeciesChecked] = useState(
    checkedObject(true, speciesArr)
  );
  const [datesChecked, setDatesChecked] = useState(
    checkedObject(true, datesCategoryProps)
  );

  const [iceAgeChecked, setIceAgeChecked] = useState(
    checkedObject(true, iceAgeDatesArr)
  );
  const [iceAgeCounterArr, setIceAgeCounterArr] = useState([1, 2, 2, 3, 5]);

  const [iceAgeEnabled, setIceAgeEnabled] = useState(true);

  const [northAmericanPolygon, setNorthAmericanPolygon] = useState(false);
  const [europeanPolygon, setEuropeanPolygon] = useState(false);

  const [desertPolygon, setDesertPolygon] = useState({
    greenSahara: false,
    greenArabia: false,
  });

  const [selectAllSpecies, setSelectAllSpecies] = useState(true);
  const [selectAllDates, setSelectAllDates] = useState(true);

  //state to control animation play state of TimeLineComponent
  const [playState, setPlayState] = useState({
    greenSahara: "paused",
    greenArabia: "paused",
    iceAge: "paused",
  });

  const [correspondingCounterObject, setCorrespondingCounterObject] = useState(
    {}
  );
  const [counterStateObject, setCounterStateObject] = useState({});

  useEffect(() => {
    //*** creates state object linking dates to iceAgeDates by comparing dates.
    const counterStateObj = {};
    const correspondingCounterStateObj = {};
    for (const name in datesCategoryObj) {
      const greater = datesCategoryObj[name].greater;
      const lesser = datesCategoryObj[name].lesser + 1;
      const difference = (greater - lesser) / 2;
      const midpoint = lesser + difference;

      const dateStack = [greater, lesser, midpoint];
      const closureFN = comparatorIceAgeDates(dateStack);
      const iceAgeGreaterProp = closureFN();
      if (iceAgeGreaterProp) {
        const iceAgeDatesArrValue =
          europeanGlacialTimelineGreater[iceAgeGreaterProp].timePeriod;
        const iceAgeCounterIndex = iceAgeDatesArr.indexOf(iceAgeDatesArrValue);
        if (counterStateObj[iceAgeCounterIndex]) {
          counterStateObj[iceAgeCounterIndex][true] = {
            ...counterStateObj[iceAgeCounterIndex][true],
            [`${name}`]: true,
          };
          counterStateObj[iceAgeCounterIndex][false] = {
            ...counterStateObj[iceAgeCounterIndex][false],
            [`${name}`]: false,
          };
        } else {
          counterStateObj[iceAgeCounterIndex] = { true: { [`${name}`]: true } };
          counterStateObj[iceAgeCounterIndex][false] = { [`${name}`]: false };
        }
        correspondingCounterStateObj[name] = iceAgeCounterIndex;
      }
    }
    setCorrespondingCounterObject(correspondingCounterStateObj);
    setCounterStateObject(counterStateObj);
  }, []);

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

  useEffect(() => {
    if (Object.keys(counterStateObject).length === 0) return;
    const iceAgeDatesCounter = [1, 2, 2, 3, 5];
    const mergerObjectIceAge = {};
    let mergerObjectDates = {};

    for (let i = 0; i < iceAgeCounterArr.length; i++) {
      if (iceAgeCounterArr[i] === iceAgeDatesCounter[i]) {
        mergerObjectDates = {
          ...mergerObjectDates,
          ...counterStateObject[i].true,
        };
        mergerObjectIceAge[iceAgeDatesArr[i]] = true;
      }
      if (iceAgeCounterArr[i] === 0) {
        mergerObjectIceAge[iceAgeDatesArr[i]] = false;
        mergerObjectDates = {
          ...mergerObjectDates,
          ...counterStateObject[i].false,
        };
      }
    }
    if (Object.keys(mergerObjectIceAge).length) {
      setIceAgeChecked((prev) => {
        return { ...prev, ...mergerObjectIceAge };
      });
      setDatesChecked((prev) => {
        return { ...prev, ...mergerObjectDates };
      });
    }
  }, [iceAgeCounterArr, counterStateObject, setIceAgeChecked, setDatesChecked]);

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

  const TimeLineEventsProps = {
    item1: "Green Sahara",
    item2: "Green Arabia",
    item3: "Ice Age Time Periods",
    playState: playState,
    setPlayState: setPlayState,
    checkedState3: iceAgeChecked,
    setCheckedState3: setIceAgeChecked,
    iceAgeEnabled: iceAgeEnabled,
    setIceAgeEnabled: setIceAgeEnabled,
    showComponent1: desertPolygon,
    setShowComponent1: setDesertPolygon,
    showComponent3: northAmericanPolygon,
    setShowComponent3: setNorthAmericanPolygon,
    showComponent4: europeanPolygon,
    setShowComponent4: setEuropeanPolygon,
    setIceAgeCounterArr: setIceAgeCounterArr,
  };

  const TimeLineSummary = {
    toggleTextExpanded: "Choose Timeline Events",
    toggleTextCollapsed: "Click to choose Timeline Events",
    whichSummary: "timeline",
  };

  const MainCheckBoxProps = {
    species: "Sort by Species",
    dates: "Sort by Dates",
    speciesChecked: speciesChecked,
    setSpeciesChecked: setSpeciesChecked,
    datesChecked: datesChecked,
    setDatesChecked: setDatesChecked,
    iceAgeChecked: iceAgeChecked,
    setIceAgeChecked: setIceAgeChecked,
    selectAllDates: selectAllDates,
    setSelectAllDates: setSelectAllDates,
    selectAllSpecies: selectAllSpecies,
    setSelectAllSpecies: setSelectAllSpecies,
    setPlayState: setPlayState,
    setIceAgeCounterArr: setIceAgeCounterArr,
    correspondingCounterObject: correspondingCounterObject,
  };

  const MainCheckBoxSummary = {
    toggleTextExpanded: "Sorting",
    toggleTextCollapsed: "Click to Sort Map",
    whichSummary: "map",
  };

  const TimeLineAccordion = AccordionComponent(
    0,
    AccordionSummaryComponent,
    TimeLineEventsComponent,
    TimeLineSummary,
    TimeLineEventsProps
  );

  const MainCheckBoxAccordion = AccordionComponent(
    1,
    AccordionSummaryComponent,
    MainCheckboxContainer,
    MainCheckBoxSummary,

    MainCheckBoxProps
  );

  return (
    <div>
      {TimeLineAccordion}
      {MainCheckBoxAccordion}

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

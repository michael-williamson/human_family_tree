import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import { speciesArr, datesCategoryProps } from "../../data/listArrays";
//from helper functions
import { speciesCheckedObject, datesCheckedObject } from "../helperFunctions";
import AccordionComp from "../reusableComponents/AccordionComp";
import { Typography, Button, Grid, makeStyles } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import TimerIcon from "@material-ui/icons/Timer";
import { IconImagePngComp } from "../reusableComponents/IconImagePngComp";
import { footprintOutlinedIconPurple } from "../../media";
import { CheckboxMapperComp } from "../reusableComponents/CheckboxMapperComp";
import { IconStaticColorsComponent } from "./IconStaticColorsComponent";

export const MapPage = () => {
  const [expanded, setExpanded] = useState("");

  const [speciesChecked, setSpeciesChecked] = useState(
    speciesCheckedObject(true)
  );
  const [datesChecked, setDatesChecked] = useState(datesCheckedObject(true));
  const [selectAllSpecies, setSelectAllSpecies] = useState(true);
  const [selectAllDates, setSelectAllDates] = useState(true);

  useEffect(() => {
    if (Object.values(speciesChecked).every((item) => item))
      setSelectAllSpecies(true);
    else setSelectAllSpecies(false);
  }, [speciesChecked]);

  useEffect(() => {
    if (Object.values(datesChecked).every((item) => item)) {
      setSelectAllDates(true);
    } else setSelectAllDates(false);
  }, [datesChecked]);

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

  const useStylesDatesItemMain = makeStyles({
    root: {
      height: 300,
    },
  });

  const useStylesDatesItem = makeStyles({
    root: {
      flexBasis: 0,
    },
  });

  const MainCheckboxContainer = (props) => {
    const { species, dates } = props;

    const classesDatesItemMain = useStylesDatesItemMain();
    const classesDatesItem = useStylesDatesItem();

    return (
      <Grid
        // main container grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="baseline"
        wrap="nowrap"
        spacing={6}
        style={{ height: 500 }}
      >
        <Grid
          container
          item
          direction="column"
          justifyContent="flex-start"
          xs={6}
          spacing={4}
        >
          <Grid
            container
            item
            wrap="nowrap"
            justifyContent="center"
            spacing={1}
          >
            <Grid item>
              <Typography variant="h4" color="secondary">
                {species}
              </Typography>
            </Grid>
            <Grid item>
              <IconImagePngComp
                size="medium"
                alt="foot image"
                hueDegrees={83}
                brightness={76}
                imageURL={footprintOutlinedIconPurple}
              />
            </Grid>
          </Grid>
          {/**trying out my Component */}
          <CheckboxMapperComp
            selectAllBtn={
              <Button
                onClick={() => handleSelectAll("species")}
                variant="outlined"
                color="primary"
                size="small"
              >
                {selectAllSpecies ? "deselect all" : "select all"}
              </Button>
            }
            MuiGridCheckboxMainContainer={{
              container: true,
              item: true,
              direction: "column",
              wrap: "nowrap",
              spacing: 4,
            }}
            MuiGridCheckboxItemMainContainer={{
              container: true,
              item: true,
              direction: "row",
              wrap: "wrap",
            }}
            MuiGridCheckboxItemContainer={{
              container: true,
              item: true,
              xs: 4,
              alignItems: "center",
            }}
            checkedObject={speciesChecked}
            handleChange={handleSpeciesChange}
            MuiCheckboxComp={{
              color: "primary",
            }}
            mapArr={speciesArr}
          >
            <IconStaticColorsComponent />
          </CheckboxMapperComp>

          {/** */}
        </Grid>
        <Grid
          container
          item
          direction="column"
          justifyContent="flex-start"
          xs={6}
          spacing={4}
        >
          <Grid
            container
            item
            wrap="nowrap"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Typography variant="h4" color="secondary">
                {dates}
              </Typography>
            </Grid>

            <Grid item>
              <TimerIcon color="secondary" />
            </Grid>
          </Grid>
          <CheckboxMapperComp
            selectAllBtn={
              <Button
                onClick={() => handleSelectAll("dates")}
                variant="outlined"
                color="primary"
                size="small"
              >
                {selectAllDates ? "deselect all" : "select all"}
              </Button>
            }
            MuiGridCheckboxMainContainer={{
              container: true,
              item: true,
              direction: "column",
              wrap: "nowrap",
              spacing: 4,
            }}
            classesItemMain={classesDatesItemMain}
            MuiGridCheckboxItemMainContainer={{
              container: true,
              item: true,
              direction: "column",
              wrap: "wrap",
            }}
            classesItem={classesDatesItem}
            MuiGridCheckboxItemContainer={{
              container: true,
              item: true,
              xs: 4,
              alignItems: "center",
            }}
            checkedObject={datesChecked}
            handleChange={handleDateChange}
            MuiCheckboxComp={{
              color: "primary",
            }}
            mapArr={datesCategoryProps}
          ></CheckboxMapperComp>
        </Grid>
      </Grid>
    );
  };

  const AccordionSummaryComponent = (expandedProp) => {
    const { expanded } = expandedProp;
    return (
      <Grid container direction="row" alignItems="center">
        <Typography variant="h5" color="primary">
          {expanded ? "Sorting" : "Click to Sort Map"}
        </Typography>
        <CheckBoxIcon color="primary" fontSize="medium" />
      </Grid>
    );
  };

  return (
    <div>
      <AccordionComp
        expanded={expanded}
        setExpanded={setExpanded}
        index={0}
        children={{
          AccordionDetailsChild: (
            <MainCheckboxContainer
              species="Sort by Species"
              dates="Sort by Dates"
            />
          ),
          AccordionSummaryChild: (
            <AccordionSummaryComponent expandedProp={expanded} />
          ),
        }}
      />
      <MapComponent
        speciesChecked={speciesChecked}
        datesChecked={datesChecked}
      />
    </div>
  );
};

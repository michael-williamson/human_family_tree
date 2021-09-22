import React, { useState, useEffect } from "react";
import { speciesArr, datesCategoryProps } from "../../data/listArrays";
//from helper functions
import { speciesCheckedObject, datesCheckedObject } from "../helperFunctions";
import { Typography, Button, Grid, makeStyles } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import { IconImagePngComp } from "../reusableComponents/IconImagePngComp";
import { footprintOutlinedIconPurple } from "../../media";
import { CheckboxMapperComp } from "../reusableComponents/CheckboxMapperComp";
import { IconStaticColorsComponent } from "./IconStaticColorsComponent";

const useStylesCheckBoxMain = makeStyles({
  root: {},
});

const useStylesDatesItemMain = makeStyles((theme) => ({
  root: {
    height: 300,
    overflow: "scroll",
    [theme.breakpoints.up("lg")]: {
      overflow: "hidden",
    },
  },
}));

const useStylesDatesItem = makeStyles({
  root: {
    flexBasis: 0,
  },
});

export const MainCheckboxContainer = (props) => {
  const { species, dates } = props;
  const { datesChecked, setDatesChecked } = props;
  const { speciesChecked, setSpeciesChecked } = props;

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
  const classesMain = useStylesCheckBoxMain();
  const classesDatesItemMain = useStylesDatesItemMain();
  const classesDatesItem = useStylesDatesItem();

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
  return (
    <Grid
      // main container grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="baseline"
      spacing={2}
    >
      <Grid
        container
        item
        direction="column"
        justifyContent="flex-start"
        xs={12}
        lg={6}
        spacing={2}
      >
        <Grid container item wrap="nowrap" justifyContent="center">
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
          Button={
            <Button
              onClick={() => handleSelectAll("species")}
              variant="outlined"
              color="primary"
              size="small"
            >
              {selectAllSpecies ? "deselect all" : "select all"}
            </Button>
          }
          classesMain={classesMain}
          MuiGridCheckboxMainContainer={{
            container: true,
            item: true,
            direction: "column",
            wrap: "nowrap",
            spacing: 2,
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
            xs: 8,
            lg: 4,
            alignItems: "center",
            wrap: "nowrap",
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
        xs={12}
        lg={6}
        spacing={2}
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
          Button={
            <Button
              onClick={() => handleSelectAll("dates")}
              variant="outlined"
              color="primary"
              size="small"
            >
              {selectAllDates ? "deselect all" : "select all"}
            </Button>
          }
          classesMain={classesMain}
          MuiGridCheckboxMainContainer={{
            container: true,
            item: true,
            direction: "column",
            wrap: "nowrap",
            spacing: 2,
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
            xs: 8,
            lg: 4,
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

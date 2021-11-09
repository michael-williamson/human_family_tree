import React, { useEffect } from "react";
import {
  speciesArr,
  datesCategoryProps,
  iceAgeDatesArr,
} from "../../../data/listArrays";
//from helper functions
import { animationPlayState, checkedObject } from "../../helperFunctions";
import { Typography, Button, Grid, makeStyles } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import { IconImagePngComp } from "../../reusableComponents/IconImagePngComp";
import { footprintOutlinedIconPurple } from "../../../media";
import { CheckboxMapperComp } from "../../reusableComponents/CheckboxMapperComp";
import { IconStaticColorsComponent } from "../mapComponents/IconStaticColorsComponent";

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
  const { iceAgeChecked, setIceAgeChecked } = props;
  const { selectAllSpecies, setSelectAllSpecies } = props;
  const { selectAllDates, setSelectAllDates } = props;

  const { setIceAgeCounterArr } = props;
  const { setPlayState } = props;
  const { correspondingCounterObject } = props;

  useEffect(() => {
    if (Object.values(speciesChecked).every((item) => item))
      setSelectAllSpecies(true);
    else setSelectAllSpecies(false);
  }, [speciesChecked, setSelectAllSpecies]);

  useEffect(() => {
    const bool = Object.values(datesChecked).every((item) => item);
    if (bool && selectAllDates === false) {
      setSelectAllDates(true);
    } else if (bool === false && selectAllDates) {
      setSelectAllDates(false);
    }
  }, [datesChecked, setSelectAllDates, selectAllDates]);

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
    const name = event.target.name;
    const checked = event.target.checked;

    const iceAgeCounterIndex = correspondingCounterObject[name];
    setIceAgeCounterArr((prev) => {
      checked
        ? (prev[iceAgeCounterIndex] += 1)
        : (prev[iceAgeCounterIndex] -= 1);
      return [...prev];
    });
    setDatesChecked({
      ...datesChecked,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelectAll = (prop) => (event) => {
    if (prop === "species" && selectAllSpecies === false) {
      setSpeciesChecked((prev) => {
        return { ...prev, ...checkedObject(true, speciesArr) };
      });
    } else if (prop === "species" && selectAllSpecies) {
      setSpeciesChecked((prev) => {
        return { ...prev, ...checkedObject(false, speciesArr) };
      });
    }
    if (prop === "dates" && selectAllDates === false) {
      setDatesChecked((prev) => {
        return { ...prev, ...checkedObject(true, datesCategoryProps) };
      });
      animationPlayState(setPlayState, iceAgeChecked, event);
      setIceAgeChecked((prev) => {
        return { ...prev, ...checkedObject(true, iceAgeDatesArr) };
      });
      setIceAgeCounterArr([1, 2, 2, 3, 5]);
    } else if (prop === "dates" && selectAllDates) {
      setDatesChecked((prev) => {
        return { ...prev, ...checkedObject(false, datesCategoryProps) };
      });
      animationPlayState(setPlayState, iceAgeChecked, event);
      setIceAgeChecked((prev) => {
        return { ...prev, ...checkedObject(false, iceAgeDatesArr) };
      });
      setIceAgeCounterArr([0, 0, 0, 0, 0]);
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
        <CheckboxMapperComp
          Button={
            <Button
              onClick={handleSelectAll("species")}
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
              onClick={handleSelectAll("dates")}
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

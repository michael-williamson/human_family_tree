import React from "react";
import { Typography, Button, Grid, makeStyles } from "@material-ui/core";
// import { IconStaticColorsComponent } from "./IconStaticColorsComponent";
import { CheckboxMapperComp } from "../reusableComponents/CheckboxMapperComp";
// import { IconImagePngComp } from "../reusableComponents/IconImagePngComp";
// import { footprintOutlinedIconPurple } from "../../media";
import { greenArabiaDates, greenSaharaDates } from "../../data/listArrays";

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

export const TimeLineEventsComponent = (props) => {
  const { item1, item2 } = props;
  const { checkedState1, checkedState2 } = props;
  const { setCheckedState1, setCheckedState2 } = props;
  const { showComponent1, setShowComponent1 } = props;
  const { showComponent2, setShowComponent2 } = props;

  const handleGreenSaharaChange = (event) => {
    setCheckedState1({
      ...checkedState1,
      [event.target.name]: event.target.checked,
    });
  };
  const handleGreenArabiaChange = (event) => {
    setCheckedState2({
      ...checkedState2,
      [event.target.name]: event.target.checked,
    });
  };

  const handleToggle = (whichToggle) => {
    whichToggle === "greenSahara"
      ? setShowComponent1(!showComponent1)
      : setShowComponent2(!showComponent2);
  };

  const classesMain = useStylesCheckBoxMain();
  const classesDatesItemMain = useStylesDatesItemMain();
  const classesDatesItem = useStylesDatesItem();

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
              {item1}
            </Typography>
          </Grid>
          <Grid item>
            {/* <IconImagePngComp
              size="medium"
              alt="foot image"
              hueDegrees={83}
              brightness={76}
              imageURL={footprintOutlinedIconPurple}
            /> */}
          </Grid>
        </Grid>
        {/**trying out my Component */}
        <CheckboxMapperComp
          Button={
            <Button
              onClick={() => handleToggle("greenSahara")}
              variant="outlined"
              color="primary"
              size="small"
            >
              {showComponent1 ? "Hide" : "Show"}
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
          checkedObject={checkedState1}
          handleChange={handleGreenSaharaChange}
          MuiCheckboxComp={{
            color: "primary",
          }}
          mapArr={greenSaharaDates}
        >
          {/* <IconStaticColorsComponent /> */}
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
              {item2}
            </Typography>
          </Grid>

          <Grid item>{/* <TimerIcon color="secondary" /> */}</Grid>
        </Grid>
        <CheckboxMapperComp
          Button={
            <Button
              onClick={() => handleToggle("greenArabia")}
              variant="outlined"
              color="primary"
              size="small"
            >
              {showComponent2 ? "Hide" : "Show"}
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
          checkedObject={checkedState2}
          handleChange={handleGreenArabiaChange}
          MuiCheckboxComp={{
            color: "primary",
          }}
          mapArr={greenArabiaDates}
        ></CheckboxMapperComp>
      </Grid>
    </Grid>
  );
};

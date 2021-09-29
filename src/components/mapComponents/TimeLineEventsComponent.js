import React from "react";
import {
  Grid,
  Box,
  FormControlLabel,
  Switch,
  makeStyles,
} from "@material-ui/core";
import { CheckboxMapperComp } from "../reusableComponents/CheckboxMapperComp";
import { iceAgeDatesArr } from "../../data/listArrays";
import { filterDates } from "../helperFunctions/index";
import {
  arabia_map,
  arabia_map_no_filler,
  sahara_map,
  sahara_map_no_filler,
} from "../../media";

const useStylesMainContainer = makeStyles({
  root: { minHeight: 340 },
});

const useStylesItemContainer = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5f5dc5e",
    minHeight: 300,
    [theme.breakpoints.up("lg")]: {
      border: "1px solid #b05113",
    },
  },
  saharaArabiaContainer: {
    alignItems: "flex-start",
    [theme.breakpoints.up("sm")]: {
      alignItems: "center",
    },
  },
  titleBoxSahara: {
    position: "relative",
    isolation: "isolate",
    "&::after": {
      content: "' '",
      position: "absolute",
      filter: "drop-shadow(2px 4px 6px black)",
      backgroundImage: (props) =>
        props.showComponent1.greenSahara
          ? `url(${sahara_map})`
          : `url(${sahara_map_no_filler})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      transform: "translate(25%,-8%)",
      minHeight: 100,
      width: 142,
      borderRadius: 20,
      outline: "4px solid black",
      animation: `$enter 1000ms ${theme.transitions.easing.easeIn} 1 forwards`,
    },
  },
  "@keyframes enter": {
    "0%": {
      opacity: 0.5,
      outline: "4px solid black",
    },
    "100%": {
      opacity: 1,
      outline: "4px solid black",
    },
  },
  titleBoxArabia: {
    position: "relative",
    isolation: "isolate",
    "&::after": {
      content: "' '",
      position: "absolute",
      filter: "drop-shadow(2px 4px 6px black)",
      backgroundImage: (props) =>
        props.showComponent1.greenArabia
          ? `url(${arabia_map})`
          : `url(${arabia_map_no_filler})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      transform: "translate(25%,-8%)",
      minHeight: 100,
      width: 142,
      borderRadius: 20,
      outline: "4px solid black",
      animation: `$enter 1000ms ${theme.transitions.easing.easeIn} 1 forwards`,
    },
  },
}));

const useStylesCheckBoxMain = makeStyles({});

export const TimeLineEventsComponent = (props) => {
  const { item1, item2, item3 } = props;
  const { checkedState3 } = props;
  const { setCheckedState3 } = props;
  const { showComponent1, setShowComponent1 } = props;
  const { datesChecked, setDatesChecked } = props;
  const { iceAgeEnabled, setIceAgeEnabled } = props;

  const handleIceAgeChange = (event) => {
    setCheckedState3({
      ...checkedState3,
      [event.target.name]: event.target.checked,
    });
    setDatesChecked({ ...datesChecked, ...filterDates(event, datesChecked) });
  };

  const handleEnableIceAge = (event) => {
    setIceAgeEnabled(event.target.checked);
  };

  const handleDesertChange = (event) => {
    setShowComponent1({
      ...showComponent1,
      [event.target.name]: event.target.checked,
    });
  };

  const classesMainContainer = useStylesMainContainer();
  const classesItemsContainer = useStylesItemContainer(props);
  const classesMain = useStylesCheckBoxMain();

  return (
    <Grid
      // main container grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={2}
      className={classesMainContainer.root}
    >
      <Grid
        container
        item
        direction="column"
        justifyContent="space-around"
        xs={12}
        lg={5}
        spacing={2}
        className={classesItemsContainer.root}
      >
        <Grid
          container
          item
          direction="column"
          wrap="nowrap"
          spacing={2}
          className={classesItemsContainer.saharaArabiaContainer}
        >
          <Grid item>
            <Box
              variant="h4"
              color="secondary.main"
              fontSize="1.5rem"
              fontWeight="bold"
              className={classesItemsContainer.titleBoxSahara}
            >
              {item1}
            </Box>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={showComponent1.greenSahara}
                  onChange={handleDesertChange}
                  name="greenSahara"
                  color="primary"
                />
              }
              label="show/hide"
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="column"
          spacing={2}
          className={classesItemsContainer.saharaArabiaContainer}
        >
          <Grid item>
            <Box
              variant="h4"
              color="secondary.main"
              fontSize="1.5rem"
              fontWeight="bold"
              className={classesItemsContainer.titleBoxArabia}
            >
              {item2}
            </Box>
          </Grid>

          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={showComponent1.greenArabia}
                  onChange={handleDesertChange}
                  name="greenArabia"
                  color="primary"
                />
              }
              label="show/hide"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        item
        direction="column"
        justifyContent="flex-start"
        xs={12}
        lg={5}
        spacing={2}
        className={classesItemsContainer.root}
      >
        <Grid
          container
          item
          direction="column"
          wrap="nowrap"
          justifyContent="center"
          spacing={2}
        >
          <Grid item>
            <Box
              variant="h4"
              color="secondary.main"
              fontSize="1.5rem"
              fontWeight="bold"
            >
              {item3}
            </Box>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={iceAgeEnabled}
                  onChange={handleEnableIceAge}
                  name="iceAge"
                  color="primary"
                />
              }
              label="enable/disable"
            />
          </Grid>
        </Grid>
        {/**trying out my Component */}
        <CheckboxMapperComp
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
          checkedObject={checkedState3}
          disabled={iceAgeEnabled ? false : true}
          handleChange={handleIceAgeChange}
          MuiCheckboxComp={{
            color: "primary",
          }}
          mapArr={iceAgeDatesArr}
        >
          {/* <IconStaticColorsComponent /> */}
        </CheckboxMapperComp>

        {/** */}
      </Grid>
    </Grid>
  );
};

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
  rain,
  oasis,
  north_american_ice_sheet,
  european_ice_sheet,
  north_american_ice_sheet_no_filler,
  european_ice_sheet_no_filler,
  glacier_canyon,
  ice_bergs,
} from "../../media";

//***********variables to keep styling consistent between similar or identical elements */
const eventStyles = {
  title: {
    position: "relative",
    isolation: "isolate",
    perspectiveOrigin: "left",
    perspective: 113,
  },
  titleImgAfter: {
    content: "' '",
    position: "absolute",
    minHeight: 100,
    width: 142,
    filter: "drop-shadow(2px 4px 6px black)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    transform: "translate(25%,-8%)",
    borderRadius: 20,
    cursor: "pointer",
    transition: "transform 500ms,box-shadow 600ms",
    opacity: 1,
  },
};

const useStylesMainContainer = makeStyles((theme) => ({
  root: { minHeight: 340 },
  itemContainer: {
    backgroundColor: "#f5f5dc5e",

    [theme.breakpoints.up("lg")]: {
      border: "1px solid #b05113",
    },

    [theme.breakpoints.up("xs")]: {
      minHeight: 500,
      marginTop: 22,
    },
    [theme.breakpoints.up("md")]: {
      minHeight: 300,
    },
  },
  saharaArabiaContainer: {
    alignItems: "flex-start",
    // [theme.breakpoints.up("sm")]: {
    //   alignItems: "center",
    // },
  },
  titleBoxSahara: {
    ...eventStyles.title,
    "&::after": {
      ...eventStyles.titleImgAfter,
      outline: `4px solid ${theme.palette.primary.light}`,
      animation: (props) =>
        props.playState.greenSahara === "running"
          ? `enter 250ms ${theme.transitions.easing.easeIn}  1 forwards ${props.playState.greenSahara}`
          : "none",
      backgroundImage: (props) =>
        props.showComponent1.greenSahara
          ? `url(${sahara_map})`
          : `url(${sahara_map_no_filler})`,
    },
    "&:hover::after": {
      boxShadow: " -20px 3px 11px 20px #00000091",
      transform: "rotate3d(2, 17, 10, 14deg)",
    },
    "&::before": {
      content: "' '",
      position: "absolute",
      backgroundImage: `url(${rain})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      transform: "translate(134%,0%)",
      minHeight: eventStyles.titleImgAfter.minHeight,
      width: eventStyles.titleImgAfter.width,
      borderRadius: "24%",
      filter: "drop-shadow(0px 12px 13px rgb(173 216 230 / 30%))",
      boxShadow: "inset 4px -3px 20px 15px #e1e1e1c2",
    },
  },

  titleBoxArabia: {
    ...eventStyles.title,
    "&::after": {
      ...eventStyles.titleImgAfter,
      outline: `4px solid ${theme.palette.primary.light}`,
      animation: (props) =>
        props.playState.greenArabia === "running"
          ? `enter 250ms ${theme.transitions.easing.easeIn} 1 forwards ${props.playState.greenArabia}`
          : "none",
      backgroundImage: (props) =>
        props.showComponent1.greenArabia
          ? `url(${arabia_map})`
          : `url(${arabia_map_no_filler})`,
    },
    "&:hover::after": {
      boxShadow: " -20px 3px 11px 20px #00000091",
      transform: "rotate3d(2, 17, 10, 14deg)",
    },
    "&::before": {
      content: "' '",
      position: "absolute",
      backgroundImage: `url(${oasis})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      transform: "translate(134%,0%)",
      minHeight: eventStyles.titleImgAfter.minHeight,
      width: eventStyles.titleImgAfter.width,
      borderRadius: "24%",
      filter: "drop-shadow(0px 12px 13px  rgb(84 231 5 / 10%))",
      boxShadow: "inset 4px -3px 20px 15px #e1e1e1c2",
    },
  },
  iceAgeImageContainer1: {
    perspectiveOrigin: "left",
    perspective: 406,
    position: "relative",
    isolation: "isolate",
    "&::after": {
      content: "' '",
      position: "absolute",
      backgroundImage: `url(${ice_bergs})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: 142,
      height: 100,
      borderRadius: 20,
      left: 0,
      right: 0,
      margin: "0 auto",
      zIndex: -1,
    },
  },
  iceAgeImageContainer2: {
    perspectiveOrigin: "left",
    perspective: 406,
    position: "relative",
    isolation: "isolate",
    "&::after": {
      content: "' '",
      position: "absolute",
      backgroundImage: `url(${glacier_canyon})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: 142,
      height: 100,
      borderRadius: 20,
      left: 0,
      right: 0,
      margin: "0 auto",
      zIndex: -1,
    },
  },
  iceAgeImages: {
    width: eventStyles.titleImgAfter.width,
    height: 100,
    borderRadius: 20,
    cursor: "pointer",
    outline: `4px solid ${theme.palette.primary.light}`,
    animation: (props) =>
      props.playState.iceAge === "running" && props.iceAgeEnabled
        ? `enter 250ms ${theme.transitions.easing.easeIn} 1 forwards `
        : "none",
    transition: "transform 500ms,box-shadow 600ms",
    "&:hover": {
      boxShadow: " -20px 3px 11px 20px #00000091",
      transform: "rotate3d(0, 97, 7, 59deg) translateX(-90px)",
      // transform:"rotate3d(6, 97, 10, 59deg) translateX(-90px)"
    },
  },
}));

export const TimeLineEventsComponent = (props) => {
  const { item1, item2, item3 } = props;
  //animation play state
  const { playState, setPlayState } = props;
  //checkedState3 is connected with iceAgeChecked
  const { checkedState3 } = props;
  const { setCheckedState3 } = props;

  //showComponent1 is connected with desertPolygon
  const { showComponent1, setShowComponent1 } = props;

  //showComponent3 = northAmericanPolygon  and showComponent4 = europeanPolygon
  const { showComponent3, showComponent4 } = props;

  const { datesChecked, setDatesChecked } = props;
  const { iceAgeEnabled, setIceAgeEnabled } = props;

  const handleIceAgeChange = (event) => {
    setCheckedState3({
      ...checkedState3,
      [event.target.name]: event.target.checked,
    });
    setDatesChecked({ ...datesChecked, ...filterDates(event, datesChecked) });
    if (playState.iceAge !== "running") {
      const stateObj = {};
      for (const props in playState) {
        if ("iceAge" !== props) {
          stateObj[props] = "paused";
        } else {
          stateObj["iceAge"] = "running";
        }
      }
      setPlayState((prevProps) => {
        return { ...prevProps, ...stateObj };
      });
    }
  };

  const handleEnableIceAge = (event) => {
    setIceAgeEnabled(event.target.checked);
  };

  const handleDesertChange = (event) => {
    setShowComponent1({
      ...showComponent1,
      [event.target.name]: event.target.checked,
    });

    const stateObj = {};
    for (const props in playState) {
      if (event.target.name !== props) {
        stateObj[props] = "paused";
      } else {
        stateObj[event.target.name] = "running";
      }
    }
    setPlayState((prevProps) => {
      return { ...prevProps, ...stateObj };
    });
  };

  const classes = useStylesMainContainer(props);

  return (
    <Grid
      // main container grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={2}
      className={classes.root}
    >
      <Grid
        //contains all items in desert component
        container
        item
        direction="row"
        justifyContent="space-around"
        alignContent="space-around"
        xs={12}
        lg={8}
        xl={6}
        className={classes.itemContainer}
      >
        <Grid
          container
          item
          md={6}
          lg={6}
          spacing={2}
          alignContent="center"
          style={{ backgroundColor: "brown" }}
        >
          <Box bgcolor="info.main" fontStyle="italic" py={1} px={1}>
            Due to factors such as Earth's varying orbit the desert regions of
            North Africa and Saudi Arabia periodically experienced elevated
            moisture content leading to vegetation growth and a more complex
            ecological system. This would have been new fertile ground for
            humans to experience and perhaps develop towards a modern human
            through selective pressure along with population booms and busts
          </Box>
        </Grid>
        <Grid
          //container for greenSahara and greenArabia
          container
          item
          md={6}
          lg={6}
          spacing={6}
        >
          <Grid
            container
            item
            direction="column"
            wrap="nowrap"
            spacing={2}
            sm={12}
            md={12}
            className={classes.saharaArabiaContainer}
          >
            <Grid item>
              <Box
                variant="h4"
                color="secondary.main"
                fontSize="1.5rem"
                fontWeight="bold"
                className={classes.titleBoxSahara}
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
            sm={12}
            md={12}
            className={classes.saharaArabiaContainer}
          >
            <Grid item>
              <Box
                variant="h4"
                color="secondary.main"
                fontSize="1.5rem"
                fontWeight="bold"
                className={classes.titleBoxArabia}
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
      </Grid>

      <Grid
        //container for all ice age items
        container
        item
        direction="column"
        justifyContent="flex-start"
        xs={12}
        lg={5}
        spacing={2}
        className={classes.itemContainer}
      >
        <Grid
          container
          item
          direction="column"
          wrap="nowrap"
          justifyContent="center"
          spacing={2}
        >
          <Grid
            //*****wraps both ice sheet images and title************
            container
            item
            direction="row"
            wrap="wrap"
            spacing={2}
            md={12}
            justifyContent="space-evenly"
          >
            <Grid
              container
              item
              direction="column"
              xs={12}
              md={4}
              lg={4}
              className={classes.iceAgeImageContainer1}
            >
              <Grid item>
                <img
                  src={
                    showComponent3
                      ? north_american_ice_sheet
                      : north_american_ice_sheet_no_filler
                  }
                  alt="ice sheet"
                  className={classes.iceAgeImages}
                />
              </Grid>
              <Grid item>
                <Box color="info.dark">North American Ice Sheet</Box>
              </Grid>
            </Grid>
            <Grid
              //Grid that wraps item title and switch
              container
              item
              direction="row"
              justifyContent="center"
              xs={12}
              sm={6}
              md={4}
              lg={4}
            >
              {/* //may need a grid around Box */}
              <Grid item xs={6} sm={6} md={12}>
                <Box
                  variant="h4"
                  color="secondary.main"
                  fontSize="1.5rem"
                  fontWeight="bold"
                >
                  {item3}
                </Box>
              </Grid>

              <Grid item xs={6} sm={6} md={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={iceAgeEnabled}
                      onChange={handleEnableIceAge}
                      name="iceAge"
                      color="primary"
                    />
                  }
                  label={iceAgeEnabled ? "enabled" : "disabled"}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              direction="column"
              xs={12}
              md={4}
              lg={4}
              className={classes.iceAgeImageContainer2}
            >
              <Grid item>
                <img
                  src={
                    showComponent4
                      ? european_ice_sheet
                      : european_ice_sheet_no_filler
                  }
                  alt="ice sheet"
                  className={classes.iceAgeImages}
                />
              </Grid>
              <Grid>
                <Box color="info.dark">European Ice Age Sheet</Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/**trying out my Component */}
        <CheckboxMapperComp
          classesMain={classes.root}
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

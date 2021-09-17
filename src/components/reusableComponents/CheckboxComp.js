import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { IconComponent } from "../mapComponents/MapPage";

import { useStyles } from "../componentStyle/CheckboxCompStyles";
import { speciesArr } from "../../data/listArrays";

const CheckBoxMapper = (props) => {
  const { checked, handleChange, mapArr } = props;
  const useStyles = makeStyles({
    root: {
      textAlign: "left",
    },
  });
  const classes = useStyles();
  return mapArr.map((item) => {
    return (
      <Grid container xs={4} justifyContent="flex-start" alignItems="center">
        <FormControlLabel
          key={item}
          className={classes.root}
          control={
            <Checkbox
              checked={checked?.[`${item}`]}
              onChange={handleChange}
              name={item}
              color="primary"
            />
          }
          label={item}
        />
        {mapArr === speciesArr ? <IconComponent props={item} /> : null}
      </Grid>
    );
  });
};

export const CheckboxComp = (props) => {
  const { checked, handleChange, sortBy, mapArr, selectAllBtn } = props;

  const classes = useStyles();

  return (
    <FormGroup row className={classes.root}>
      <Typography component="h2" className={classes.h2}>
        {sortBy}
      </Typography>
      {selectAllBtn ? selectAllBtn : null}
      <Grid container>
        <CheckBoxMapper
          handleChange={handleChange}
          checked={checked}
          mapArr={mapArr}
        />
      </Grid>
    </FormGroup>
  );
};

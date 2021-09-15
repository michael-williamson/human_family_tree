import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { speciesArr } from "../data/listArrays";
import { useStyles } from "./componentStyle/CheckboxCompStyles";
import { Typography } from "@material-ui/core";

const CheckBoxMapper = (props) => {
  const { speciesChecked, handleChange } = props;
  return speciesArr.map((item) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={speciesChecked?.[`${item}`]}
            onChange={handleChange}
            name={item}
            color="primary"
          />
        }
        label={item}
      />
    );
  });
};

export const CheckboxSpeciesComp = (props) => {
  const { speciesChecked, handleChange } = props;

  const classes = useStyles();

  return (
    <FormGroup row className={classes.root}>
      <Typography component="h2" className={classes.h2}>
        Sort By Species:
      </Typography>
      <CheckBoxMapper
        handleChange={handleChange}
        speciesChecked={speciesChecked}
      />
    </FormGroup>
  );
};

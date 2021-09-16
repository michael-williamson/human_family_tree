import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Typography } from "@material-ui/core";

import { useStyles } from "../componentStyle/CheckboxCompStyles";

const CheckBoxMapper = (props) => {
  const { checked, handleChange, mapArr } = props;
  return mapArr.map((item) => {
    return (
      <FormControlLabel
        key={item}
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
      <CheckBoxMapper
        handleChange={handleChange}
        checked={checked}
        mapArr={mapArr}
      />
    </FormGroup>
  );
};

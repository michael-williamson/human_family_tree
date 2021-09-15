import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Typography } from "@material-ui/core";
import { datesCatergory } from "../data/listArrays";
import { useStyles } from "./componentStyle/CheckboxCompStyles";

const CheckBoxMapper = (props) => {
  const { datesChecked, handleDateChange } = props;
  return datesCatergory.map((item) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={datesChecked?.[`${item}`]}
            onChange={handleDateChange}
            name={item}
            color="primary"
          />
        }
        label={item}
      />
    );
  });
};

export const CheckboxDatesComp = (props) => {
  const { datesChecked, handleDateChange } = props;

  const classes = useStyles();

  return (
    <FormGroup row className={classes.root}>
      <Typography component="h2" className={classes.h2}>
        Sort By Date:
      </Typography>
      <CheckBoxMapper
        handleDateChange={handleDateChange}
        datesChecked={datesChecked}
      />
    </FormGroup>
  );
};

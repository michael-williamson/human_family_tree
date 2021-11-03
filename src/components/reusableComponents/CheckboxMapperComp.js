import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import React from "react";

export const CheckboxMapperComp = (props) => {
  const { MuiGridCheckboxMainContainer } = props;
  const { MuiGridCheckboxItemMainContainer } = props;
  const { classesMain } = props;
  const { classesItemMain } = props;
  const { classesItem } = props;
  const { Button } = props;
  const { MuiGridCheckboxItemContainer } = props;
  const { MuiFormControlLabel } = props;
  const { MuiCheckboxComp } = props;
  const { mapArr } = props;
  const { handleChange } = props;
  const { checkedObject } = props;
  const { disabled } = props;

  const MapperComp = (
    MuiGridCheckboxItemContainer,
    classesItem,
    MuiFormControlLabel,
    MuiCheckboxComp,
    handleChange,
    disabled,
    checkedObject
  ) => {
    return mapArr.map((item) => {
      return (
        <Grid
          {...MuiGridCheckboxItemContainer}
          key={item}
          className={classesItem?.root}
        >
          <FormControlLabel
            {...MuiFormControlLabel}
            control={
              <Checkbox
                {...MuiCheckboxComp}
                onChange={handleChange}
                name={item}
                disabled={disabled}
                checked={disabled ? false : checkedObject?.[`${item}`]}
              />
            }
            label={item}
          />
        </Grid>
      );
    });
  };

  return (
    <Grid {...MuiGridCheckboxMainContainer} className={classesMain?.root}>
      <Grid container item>
        <Grid item>{Button}</Grid>
      </Grid>
      <Grid
        {...MuiGridCheckboxItemMainContainer}
        className={classesItemMain?.root}
      >
        {MapperComp(
          MuiGridCheckboxItemContainer,
          classesItem,
          MuiFormControlLabel,
          MuiCheckboxComp,
          handleChange,
          disabled,
          checkedObject
        )}
      </Grid>
    </Grid>
  );
};

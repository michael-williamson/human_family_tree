import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import React from "react";

export const CheckboxMapperComp = (props) => {
  const { MuiGridCheckboxMainContainer } = props;
  const { MuiGridCheckboxItemMainContainer } = props;
  const { classesItemMain } = props;
  const { classesItem } = props;
  const { selectAllBtn } = props;
  const { MuiGridCheckboxItemContainer } = props;
  const { MuiFormControlLabel } = props;
  const { MuiCheckboxComp } = props;
  const { mapArr } = props;
  const { handleChange } = props;
  const { checkedObject } = props;

  const MapperComp = mapArr.map((item) => {
    const childrenWithProps = React.Children.map(props.children, (child) => {
      return React.cloneElement(child, { props: item });
    });
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
              checked={checkedObject?.[`${item}`]}
            />
          }
          label={item}
        />
        {/** Icon from the children props */}
        <Grid item>{childrenWithProps}</Grid>
      </Grid>
    );
  });

  return (
    <Grid {...MuiGridCheckboxMainContainer}>
      <Grid container item>
        <Grid item>{selectAllBtn}</Grid>
      </Grid>
      <Grid
        {...MuiGridCheckboxItemMainContainer}
        className={classesItemMain?.root}
      >
        {MapperComp}
      </Grid>
    </Grid>
  );
};

import React from "react";
import { Box } from "@mui/system";
import { CheckboxComponent } from "../../ReusableComponents/CheckboxComponent";
import {
  formControlStyles,
  checkboxStyles,
} from "../../../Styles/MapComponentStyles/MapKeyComponentStyles";

export const CheckBoxList = (props) => {
  const {
    arr = [{}],
    state = {},
    containerEventObject = {},
    className,
    checkboxComponentContainerStyles = {},
    checkboxListStyles = {},
    checkboxComponentProps = {},
    siblingElements,
    svgObject,
  } = props;

  //
  //options for checkboxComponentProps: checkboxStyles, formControlStyles, handleChange
  return (
    <Box sx={checkboxListStyles} {...containerEventObject}>
      {arr.map((item) => (
        <CheckboxComponent
          key={item}
          label={item}
          className={className}
          checked={state[item]}
          formControlStyles={formControlStyles}
          checkboxStyles={checkboxStyles}
          checkboxComponentContainerStyles={checkboxComponentContainerStyles}
          {...checkboxComponentProps}
          siblingElements={siblingElements && siblingElements(svgObject, item)}
        />
      ))}
    </Box>
  );
};

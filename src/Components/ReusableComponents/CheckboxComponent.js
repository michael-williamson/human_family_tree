import React, { useMemo } from "react";
import { Box } from "@mui/system";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { objectEval } from "../../HelperFunctions/MapComponent/MapKeyComponents";

export const CheckboxComponent = (props) => {
  //useMemo because new event object unnecessary on rerenders
  const memoizedEventObject = useMemo(
    () => objectEval(props.fieldEventObject, props.label),
    [props.fieldEventObject, props.label]
  );
  const {
    checkboxComponentContainerStyles = {},
    checkboxStyles = {},
    checked = false,
    formControlStyles = {},
    label = "label",
    countObject,
    handleChange,
    siblingElements = null,
  } = props;

  return (
    <Box sx={checkboxComponentContainerStyles} {...memoizedEventObject}>
      <FormControlLabel
        sx={{ ...formControlStyles }}
        // ability to keep a count of items related to checkbox, return count or 0 if no items exist
        label={
          countObject
            ? `${label} (${countObject[label] > 0 ? countObject[label] : 0})`
            : label
        }
        checked={checked}
        onChange={handleChange(label)}
        control={<Checkbox sx={{ ...checkboxStyles }} />}
      />
      {siblingElements}
    </Box>
  );
};

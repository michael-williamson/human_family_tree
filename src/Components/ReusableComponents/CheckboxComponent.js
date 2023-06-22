import React, { useMemo } from "react";
import { Box } from "@mui/system";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { objectEval } from "../../HelperFunctions/MapComponent/MapKeyComponents";
import { useMapContextUpdater } from "../../State/MapState/MapStateProvider";
import { addSubtractType } from "../../HelperFunctions/State/MapLegendState";

export const CheckboxComponent = props => {
  //useMemo because new event object unnecessary on rerenders
  const memoizedEventObject = useMemo(
    () => objectEval(props.fieldEventObject, props.label),
    [props.fieldEventObject, props.label]
  );
  const handler = useMapContextUpdater();
  const {
    checkboxComponentContainerStyles = {},
    checkboxStyles = {},
    checked = false,
    formControlStyles = {},
    label = "label",
    handleChange,
    inputProps,
    siblingElements = null,
  } = props;

  return (
    <Box sx={checkboxComponentContainerStyles} {...memoizedEventObject}>
      <FormControlLabel
        sx={formControlStyles}
        // ability to keep a count of items related to checkbox, return count or 0 if no items exist
        // label={
        //   countObject
        //     ? `${label} (${countObject[label] > 0 ? countObject[label] : 0})`
        //     : label
        // }
        label={label}
        checked={checked}
        onChange={handleChange(label)}
        control={
          <Checkbox
            sx={checkboxStyles}
            name={label}
            inputProps={inputProps}
            data-category="species"
            onChange={e => {
              console.log(
                e.target.value,
                e.target.name,
                e.target.dataset.category,
                e.target.checked,
                "event ojbect checkbox"
              );

              handler({
                type: addSubtractType(e.target.checked),
                category: e.target.dataset.category,
                fieldName: e.target.name,
              });
            }}
          />
        }
      />
      {siblingElements}
    </Box>
  );
};

import React from "react";
import { Box } from "@mui/system";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { objectEval } from "../../HelperFunctions/MapComponent/MapKeyComponents";

export const CheckboxComponent = (props) => {
  const {
    checkboxComponentContainerStyles = {},
    checkboxStyles = {},
    checked = false,
    formControlStyles = {},
    label = "label",
    handleChange,
    fieldEventObject = {},
    siblingElements = null,
  } = props;

  return (
    <Box
      sx={checkboxComponentContainerStyles}
      {...objectEval(fieldEventObject, label)}
    >
      <FormControlLabel
        sx={{ ...formControlStyles }}
        label={label}
        checked={checked}
        onChange={handleChange(label)}
        control={<Checkbox sx={{ ...checkboxStyles }} />}
      />
      {siblingElements}
    </Box>
  );
};

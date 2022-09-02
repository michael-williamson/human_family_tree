import React from "react";
import { Box } from "@mui/system";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";

export const CheckboxComponent = (props) => {
  const {
    checkboxComponentContainerStyles = {},
    checkboxStyles = {},
    checked = false,
    formControlStyles = {},
    label = "label",
    handleChange,
    handleHover,
    siblingElements = null,
  } = props;

  return (
    <Box sx={checkboxComponentContainerStyles}>
      <FormControlLabel
        sx={{ ...formControlStyles }}
        label={label}
        checked={checked}
        onChange={handleChange(label)}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        control={<Checkbox sx={{ ...checkboxStyles }} />}
      />
      {siblingElements}
    </Box>
  );
};

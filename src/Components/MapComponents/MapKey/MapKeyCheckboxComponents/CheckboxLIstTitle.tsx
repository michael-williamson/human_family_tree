import React from "react";
import { Container } from "../../../ReusableComponents/Container";
import { CheckBoxListTitle } from "../../CheckBoxComponents/CheckBoxListTitle";
import {
  showListButtonStyles,
  titleTextStyles,
} from "../../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { IconButton } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

export const CheckboxLIstTitle = () => {
  return (
    <Container containerStyles={{}}>
      <CheckBoxListTitle
        titleTextStyles={titleTextStyles}
        titleText={"title"}
        iconComponent={{}}
      />
      <IconButton sx={showListButtonStyles}>
        <KeyboardArrowDown />
      </IconButton>
    </Container>
  );
};

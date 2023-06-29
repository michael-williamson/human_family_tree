import React from "react";
import { Container } from "../../../ReusableComponents/Container";
import { CheckBoxListTitle } from "../../CheckBoxComponents/CheckBoxListTitle";
import {
  showListButtonStyles,
  titleTextStyles,
} from "../../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { IconButton } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

export const CheckboxLIstTitle = ({
  titleText,
  collapseHandler,
}: {
  titleText: string | undefined;
  collapseHandler: any;
}) => {
  return (
    <Container containerStyles={{}}>
      <CheckBoxListTitle
        titleTextStyles={titleTextStyles}
        titleText={titleText}
        iconComponent={{}}
      />
      <IconButton sx={showListButtonStyles} onClick={collapseHandler}>
        <KeyboardArrowDown />
      </IconButton>
    </Container>
  );
};

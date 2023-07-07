import { Container } from "../../../ReusableComponents/Container";
import {
  showListButtonStyles,
  titleTextStyles,
} from "../../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { IconButton } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { TextComponent } from "../../../ReusableComponents/TextComponent";

const containerStyles = {};

export const CheckboxLIstTitle = ({
  titleText,
  collapseHandler,
}: {
  titleText: string | undefined;
  collapseHandler: any;
}) => {
  return (
    <Container containerStyles={containerStyles}>
      <TextComponent styles={titleTextStyles}>{titleText}</TextComponent>
      <IconButton sx={showListButtonStyles} onClick={collapseHandler}>
        <KeyboardArrowDown />
      </IconButton>
    </Container>
  );
};

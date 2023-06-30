import React from "react";
import { Container } from "../../ReusableComponents/Container";
import { CheckboxListContainer } from "./CheckboxListContainer";
import { MapKeyTitleComponent } from "./MapKeyCheckboxComponents/MapKeyTitleComponent";
import { mapKeyContainerStyles } from "../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { mapContainerStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";

interface MapKeyContainerProps {
  visibility: string;
}

export const stylesFormatter = (visibility: string = "visible") => {
  return {
    ...mapKeyContainerStyles,
    ...mapContainerStyles,
    visibility: visibility,
  };
};

export const MapKeyContainer = ({ visibility }: MapKeyContainerProps) => {
  const containerStyles = stylesFormatter(visibility);
  return (
    <Container containerStyles={containerStyles}>
      <MapKeyTitleComponent />
      <CheckboxListContainer />
    </Container>
  );
};

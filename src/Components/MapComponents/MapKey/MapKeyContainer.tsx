import React from "react";
import { Container } from "../../ReusableComponents/Container";
import { CheckboxListContainer } from "./CheckboxListContainer";
import { MapKeyTitleComponent } from "./MapKeyCheckboxComponents/MapKeyTitleComponent";
import { mapKeyContainerStyles } from "../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { mapContainerStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";

export const MapKeyContainer = () => {
  return (
    <Container
      containerStyles={{ ...mapKeyContainerStyles, ...mapContainerStyles }}
    >
      <MapKeyTitleComponent />
      <CheckboxListContainer />
    </Container>
  );
};

import React from "react";
import { Container } from "../../ReusableComponents/Container";
import { mapContainerStyles } from "../../../Styles/MapComponentStyles/MapContainerStyles";
import { CheckboxListContainer } from "./CheckboxListContainer";
import { MapKeyTitleComponent } from "./MapKeyCheckboxComponents/MapKeyTitleComponent";

export const MapKeyContainer = () => {
  return (
    <Container containerStyles={mapContainerStyles}>
      <MapKeyTitleComponent />
      <CheckboxListContainer />
    </Container>
  );
};

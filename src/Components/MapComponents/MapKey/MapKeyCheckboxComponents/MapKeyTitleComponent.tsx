import React from "react";
import { Container } from "../../../ReusableComponents/Container";
import {
  mapLegendTitleContainerStyles,
  mapLegendTitleImageContainer,
  mapLegendTitleStyles,
} from "../../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { TextComponent } from "../../../ReusableComponents/TextComponent";
import { CardMedia } from "@mui/material";
import { mapKeyIcon } from "../../../../Media/PageTitle_Navigation_Icons";

export const MapKeyTitleComponent = () => {
  return (
    <Container containerStyles={mapLegendTitleContainerStyles}>
      <TextComponent styles={mapLegendTitleStyles}>Map Key</TextComponent>
      <Container containerStyles={mapLegendTitleImageContainer}>
        <CardMedia component="img" src={mapKeyIcon} />
      </Container>
    </Container>
  );
};

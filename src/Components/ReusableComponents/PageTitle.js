import React from "react";
import { Box } from "@mui/system";
import { TextComponent } from "./TextComponent";
import {
  pageTitleStyles,
  pageTitleIconStyles,
  pageTitleContainer,
} from "../../Styles/ReusableComponentStyles";
import { CardMedia } from "@mui/material";

export const PageTitle = (props) => {
  const {
    text = "Page Title",
    pageTitleContainerAdditionalStyles = {},
    specificTextStyles = {},
    imageSrc,
    imageAltText = "icon",
  } = props;
  return (
    <Box sx={{ ...pageTitleContainer, ...pageTitleContainerAdditionalStyles }}>
      <TextComponent styles={{ ...pageTitleStyles, ...specificTextStyles }}>
        {text}
      </TextComponent>
      <CardMedia
        src={imageSrc}
        component="img"
        sx={pageTitleIconStyles}
        alt={imageAltText}
      />
    </Box>
  );
};

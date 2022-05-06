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
  } = props;
  return (
    <Box sx={{ ...pageTitleContainer, ...pageTitleContainerAdditionalStyles }}>
      <TextComponent
        text={text}
        styles={{ ...pageTitleStyles, ...specificTextStyles }}
      />
      <CardMedia src={imageSrc} component="img" sx={pageTitleIconStyles} />
    </Box>
  );
};

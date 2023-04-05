import React from "react";
import { Box } from "@mui/material";
import { Link } from "@mui/material";
import { TextComponent } from "../ReusableComponents/TextComponent";

const containerStyles = {
  display: "flex",
  fontSize: "10px",
};

export const ImageAttributionComponent = ({
  author,
  license,
  labelStyles,
  linkStyles,
}) => {
  return (
    <Box sx={containerStyles}>
      <TextComponent styles={labelStyles}>Author:</TextComponent>
      <Link
        href="#"
        component="a"
        rel="noreferrer"
        target="_blank"
        sx={linkStyles}
      >
        {author},{" "}
      </Link>
      <TextComponent styles={labelStyles}>License:</TextComponent>
      <Link
        href="#"
        component="a"
        rel="noreferrer"
        target="_blank"
        sx={linkStyles}
      >
        {license},{" "}
      </Link>
      <TextComponent styles={labelStyles}>via Wikimedia Commons</TextComponent>
    </Box>
  );
};

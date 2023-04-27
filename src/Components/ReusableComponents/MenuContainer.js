import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { TextComponent } from "../ReusableComponents/TextComponent";

export const MenuContainer = ({
  titleText,
  menuTitleStyles,
  menuButtonContainerStyles,
  sourceArr,
  clickHandler,
  menuButtonStyles,
}) => {
  return (
    <Box>
      <TextComponent styles={menuTitleStyles}>{titleText}</TextComponent>
      <Box sx={menuButtonContainerStyles}>
        {sourceArr.map((item) => (
          <Button key={item} onClick={clickHandler(item)} sx={menuButtonStyles}>
            {item}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

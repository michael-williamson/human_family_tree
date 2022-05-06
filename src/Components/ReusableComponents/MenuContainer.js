import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { TextComponent } from "../ReusableComponents/TextComponent";

export const MenuContainer = (props) => {
  const {
    titleText,
    menuTitleStyles,
    menuButtonContainerStyles,
    sourceArr,
    clickHandler,
    menuButtonStyles,
  } = props;
  return (
    <Box>
      <TextComponent text={titleText} styles={menuTitleStyles} />
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

import React from "react";
import { Box } from "@mui/system";
import { TextComponent } from "../../ReusableComponents/TextComponent";

export const CheckBoxListTitle = (props) => {
  const { titleText, titleTextStyles, IconComponent } = props;
  return (
    <Box>
      <TextComponent styles={titleTextStyles}>{titleText}</TextComponent>
      {IconComponent}
    </Box>
  );
};

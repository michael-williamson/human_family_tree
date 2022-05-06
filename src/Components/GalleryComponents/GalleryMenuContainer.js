import React from "react";
import { MenuContainer } from "../ReusableComponents/MenuContainer";
import {
  menuTitleStyles,
  menuButtonContainerStyles,
  menuButtonStyles,
} from "../../Styles/ReusableComponentStyles/MenuContainer.js";
import { speciesArr } from "../../HelperFunctions/General";

export const GalleryMenuContainer = (props) => {
  const { handler } = props;
  return (
    <MenuContainer
      titleText="Choose a Species:"
      menuTitleStyles={menuTitleStyles}
      menuButtonContainerStyles={menuButtonContainerStyles}
      sourceArr={speciesArr}
      clickHandler={handler}
      menuButtonStyles={menuButtonStyles}
    />
  );
};

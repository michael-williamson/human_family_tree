import React from "react";
import {
  menuButtonContainerStyles,
  menuButtonStyles,
  menuTitleStyles,
} from "../../Styles/ReusableComponentStyles/MenuContainer.js";
import { MenuContainer } from "../ReusableComponents/MenuContainer";

export const ChartsMenuContainer = (props) => {
  const { handler } = props;
  const chartsArray = [
    "Timeline of Events",
    "Timeline of Species",
    "Species by Continent",
    "Amount of Specimens by Species",
  ];
  return (
    <MenuContainer
      titleText="Choose a Chart:"
      menuTitleStyles={menuTitleStyles}
      menuButtonContainerStyles={menuButtonContainerStyles}
      sourceArr={chartsArray}
      clickHandler={handler}
      menuButtonStyles={menuButtonStyles}
    />
  );
};

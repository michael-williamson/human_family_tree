import React, { useState } from "react";
import { Box } from "@mui/system";
import { ChartsView } from "./ChartsView";
import { MenuContainer } from "../ReusableComponents/MenuContainer";
import {
  menuButtonContainerStyles,
  menuButtonStyles,
  menuTitleStyles,
} from "../../Styles/ReusableComponentStyles/MenuContainer.js";
import { chartsArray } from "../../HelperFunctions/ChartComponent";
import {
  useSpecimensArrayContext,
  useSpecimensBySpecies,
} from "../../State/MapState/MapItemStateArrays/SpecimensArrayProvider";

export const ChartsMainContainer = () => {
  const [chart, setChart] = useState();

  const specimensArray = useSpecimensArrayContext();
  const specimensObject = useSpecimensBySpecies();

  const handler = item => e => {
    setChart(item);
  };
  return (
    <Box>
      <MenuContainer
        titleText="Choose a Chart:"
        menuTitleStyles={menuTitleStyles}
        menuButtonContainerStyles={menuButtonContainerStyles}
        sourceArr={chartsArray}
        clickHandler={handler}
        menuButtonStyles={menuButtonStyles}
      />
      <ChartsView
        chart={chart}
        arr={specimensArray}
        specimensObject={specimensObject}
      />
    </Box>
  );
};

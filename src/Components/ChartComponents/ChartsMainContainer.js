import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { ChartsView } from "./ChartsView";
import {
  useSpecimensArrayContext,
  useSpecimensObjectContext,
} from "../MapComponents/MapStateComponents/MapPopulationStateContext";
import { useNetworkRequestDispatch } from "../MapComponents/MapStateComponents/HTTPRequestStateProvider";
import { MenuContainer } from "../ReusableComponents/MenuContainer";
import {
  menuButtonContainerStyles,
  menuButtonStyles,
  menuTitleStyles,
} from "../../Styles/ReusableComponentStyles/MenuContainer.js";
import { chartsArray } from "../../HelperFunctions/ChartComponent";
import { SELECT_ALL, SPECIES } from "../../ConstantVariableNames";

export const ChartsMainContainer = () => {
  const [chart, setChart] = useState();
  const fetchArray = useNetworkRequestDispatch();
  const specimensArray = useSpecimensArrayContext();
  const specimensObject = useSpecimensObjectContext();
  useEffect(() => {
    fetchArray({
      message: SELECT_ALL,
      propertyName: SPECIES,
    });
    return () => {};
  }, [fetchArray]);
  const handler = (item) => (e) => {
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
        fetchArray={fetchArray}
        specimensObject={specimensObject}
      />
    </Box>
  );
};

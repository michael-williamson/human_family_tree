import React, { useState } from "react";
import { Box } from "@mui/system";
import { ChartsMenuContainer } from "./ChartsMenuContainer";
import { ChartsView } from "./ChartsView";
import { MapPopulationStateContext } from "../MapComponents/MapStateComponents/MapPopulationStateContext";
import { HTTPRequestStateProvider } from "../MapComponents/MapStateComponents/HTTPRequestStateProvider";

export const ChartsMainContainer = () => {
  const [chart, setChart] = useState();
  const handler = (item) => (e) => {
    setChart(item);
  };
  return (
    <Box>
      <ChartsMenuContainer handler={handler} />
      <MapPopulationStateContext>
        <HTTPRequestStateProvider>
          <ChartsView chart={chart} />
        </HTTPRequestStateProvider>
      </MapPopulationStateContext>
    </Box>
  );
};

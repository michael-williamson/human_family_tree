import React, { useState } from "react";
import { Box } from "@mui/system";
import { ChartsMenuContainer } from "./ChartsMenuContainer";
import { ChartsView } from "./ChartsView";

export const ChartsMainContainer = () => {
  const [chart, setChart] = useState();
  const handler = (item) => (e) => {
    setChart(item);
  };
  return (
    <Box>
      <ChartsMenuContainer handler={handler} />
      <ChartsView chart={chart} />
    </Box>
  );
};

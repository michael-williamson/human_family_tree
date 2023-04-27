import React from "react";
import { Box } from "@mui/system";
import { EventsTimeline } from "./IndividualCharts/EventsTimeline";
import { SpeciesTimeline } from "./IndividualCharts/SpeciesTimeline";
import { SpecimensByContinent } from "./IndividualCharts/SpecimensByContinent";
import { SpecimensBySpecies } from "./IndividualCharts/SpecimensBySpecies";
import {
  NUMBER_OF_SPECIMENS_BY_SPECIES,
  SPECIES_BY_CONTINENT,
  TIMELINE_OF_EVENTS,
  TIMELINE_OF_SPECIES,
} from "../../ConstantVariableNames";

const componentGenerator = (state, chart) => {
  switch (chart) {
    case TIMELINE_OF_EVENTS:
      return <EventsTimeline arr={state} />;
    case TIMELINE_OF_SPECIES:
      return <SpeciesTimeline arr={state} />;
    case SPECIES_BY_CONTINENT:
      return <SpecimensByContinent arr={state} />;
    case NUMBER_OF_SPECIMENS_BY_SPECIES:
      return <SpecimensBySpecies arr={state} />;
    default:
      break;
  }
};

export const ChartsView = ({ chart, arr }) => {
  const component = componentGenerator(arr, chart);

  return <Box>{component}</Box>;
};

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

const componentGenerator = ({ arr, chart, specimensObject }) => {
  switch (chart) {
    case TIMELINE_OF_EVENTS:
      return <EventsTimeline arr={arr} />;
    case TIMELINE_OF_SPECIES:
      return <SpeciesTimeline specimensObject={specimensObject} />;
    case SPECIES_BY_CONTINENT:
      return <SpecimensByContinent arr={arr} />;
    case NUMBER_OF_SPECIMENS_BY_SPECIES:
      return <SpecimensBySpecies arr={arr} />;
    default:
      break;
  }
};

export const ChartsView = ({ chart, arr, specimensObject }) => {
  const component = componentGenerator({
    arr,

    chart,
    specimensObject,
  });

  return <Box>{component}</Box>;
};

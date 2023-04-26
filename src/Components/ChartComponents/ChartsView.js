import React from "react";
import { Box } from "@mui/system";
// import { EventsTimeline } from "./IndividualCharts/EventsTimeline";
// import { SpeciesTimeline } from "./IndividualCharts/SpeciesTimeline";
import { SpecimensByContinent } from "./IndividualCharts/SpecimensByContinent";
import { SpecimensBySpecies } from "./IndividualCharts/SpecimensBySpecies";

export const ChartsView = (props) => {
  const chartsComponentObject = {
    // "Timeline of Events": <EventsTimeline />,
    // "Timeline of Species": <SpeciesTimeline />,
    "Species by Continent": <SpecimensByContinent />,
    "Amount of Specimens by Species": <SpecimensBySpecies />,
  };
  return <Box>{chartsComponentObject[props.chart]}</Box>;
};

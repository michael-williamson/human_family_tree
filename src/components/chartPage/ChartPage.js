import React from "react";
import { EventsTimeline } from "./chartPageComponents/EventsTimeline";
import { SpeciesTimeline } from "./chartPageComponents/SpeciesTimeline";
import { SpecimensByContinent } from "./chartPageComponents/SpecimensByContinent";
import { SpecimensBySpecies } from "./chartPageComponents/SpecimensBySpecies";

export const ChartPage = () => {
  return (
    <div>
      <EventsTimeline />
      <SpeciesTimeline />
      <SpecimensByContinent />
      <SpecimensBySpecies />
    </div>
  );
};

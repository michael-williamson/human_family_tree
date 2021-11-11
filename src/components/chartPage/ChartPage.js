import React from "react";
import { SpeciesTimeline } from "./chartPageComponents/SpeciesTimeline";
import { SpecimensByContinent } from "./chartPageComponents/SpecimensByContinent";
import { SpecimensBySpecies } from "./chartPageComponents/SpecimensBySpecies";

export const ChartPage = () => {
  return (
    <div>
      <SpeciesTimeline />
      <SpecimensByContinent />
      <SpecimensBySpecies />
    </div>
  );
};

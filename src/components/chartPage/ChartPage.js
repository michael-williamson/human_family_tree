import React from "react";
import { SpeciesTimeline } from "./chartPageComponents/SpeciesTimeline";
import { SpecimensByContinent } from "./chartPageComponents/SpecimensByContinent";

export const ChartPage = () => {
  return (
    <div>
      <SpeciesTimeline />
      <SpecimensByContinent />
    </div>
  );
};

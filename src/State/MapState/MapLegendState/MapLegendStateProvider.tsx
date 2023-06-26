import React, { useContext } from "react";
import { SpeciesCheckboxProvider } from "./SpeciesCheckboxProvider";
import { DatesCheckboxProvider } from "./DatesCheckboxProvider";
import { OverlaysCheckboxProvider } from "./OverlaysCheckboxProvider";

export const MapLegendContext = React.createContext({});
export const MapLegendContextUpdater = React.createContext(null);

export function useMapLegendContext() {
  return useContext(MapLegendContext);
}

export function useMapLegendContextUpdater() {
  return useContext(MapLegendContextUpdater);
}

export const MapLegendStateProvider = ({ children }: any) => {
  return (
    <MapLegendContextUpdater.Provider value={null}>
      <SpeciesCheckboxProvider>
        <DatesCheckboxProvider>
          <OverlaysCheckboxProvider>{children}</OverlaysCheckboxProvider>
        </DatesCheckboxProvider>
      </SpeciesCheckboxProvider>
    </MapLegendContextUpdater.Provider>
  );
};

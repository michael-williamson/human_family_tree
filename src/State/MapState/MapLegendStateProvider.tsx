import React, { useContext } from "react";
import { SpeciesCheckboxProvider } from "./SpeciesCheckboxProvider";
import { DatesCheckboxProvider } from "./DatesCheckboxProvider";
import { OverlaysCheckboxProvider } from "./OverlaysCheckboxProvider";

export const MapLegendContext = React.createContext({});
export const MapLegendContextUpdater = React.createContext(null);

// const SpeciesCheckboxContext = React.createContext(null);
// const SpeciesCheckboxContextUpdater = React.createContext(null)

// const DatesCheckboxContext = React.createContext(null)
// const DatesCheckboxContextUpdater = React.createContext(null)

// const OverlaysCheckboxContext = React.createContext(null)
// const OverlaysCheckboxContextUpdater = React.createContext(null)

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

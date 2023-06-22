import React, { useCallback, useContext, useEffect, useState } from "react";
import { SpeciesCheckboxProvider } from "./SpeciesCheckboxProvider";
import { DatesCheckboxProvider } from "./DatesCheckboxProvider";
import { OverlaysCheckboxProvider } from "./OverlaysCheckboxProvider";
import { DATES, OVERLAYS, SPECIES } from "../../../ConstantVariableNames";

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

export const MapLegendStateProvider = ({
  children,
  action,
  setAction = () => null,
}: any) => {
  const [speciesData, setSpeciesData] = useState({});
  const [datesData, setDatesData] = useState({});
  const [overlaysData, setOverlaysData] = useState({});
  const switchBoard = useCallback(
    (
      actionObject = {
        type: "initial",
        category: "initial",
        fieldName: "initial",
      }
    ) => {
      const { category } = actionObject;

      console.log(category, "inside map legend provider");

      switch (category) {
        case SPECIES:
          setSpeciesData(actionObject);

          break;
        case DATES:
          setDatesData(actionObject);
          break;
        case OVERLAYS:
          setOverlaysData(actionObject);
          break;
      }
    },
    []
  );

  useEffect(() => {
    if (action && action.type === "initial") return;
    switchBoard(action);
    setAction({
      type: "initial",
      category: "initial",
      fieldName: "initial",
    });
    return () => {};
  }, [switchBoard, action, setAction]);

  return (
    <MapLegendContextUpdater.Provider value={null}>
      <SpeciesCheckboxProvider action={speciesData}>
        <DatesCheckboxProvider action={datesData}>
          <OverlaysCheckboxProvider action={overlaysData}>
            {children}
          </OverlaysCheckboxProvider>
        </DatesCheckboxProvider>
      </SpeciesCheckboxProvider>
    </MapLegendContextUpdater.Provider>
  );
};

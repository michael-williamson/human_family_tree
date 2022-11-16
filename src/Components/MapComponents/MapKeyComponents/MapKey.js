import React from "react";
import { Box } from "@mui/system";
import { TextComponent } from "../../ReusableComponents/TextComponent";
import {
  mapKeyContainerStyles,
  mapLegendTitleStyles,
  allIndividualKeysContainer,
} from "../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { IndividualKey } from "./IndividualKey";
import { speciesCheckboxContainerStyles } from "../../../Styles/MapComponentStyles/MapKeyComponentStyles/SpeciesMapKeyStyles";
import {
  useMapLegendContext,
  useMapLegendContextUpdater,
  useMapLegendFieldContextUpdater,
} from "../MapStateComponents/MapLegendStateProvider";
import { keyObject } from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";
import {
  keysToCountArray,
  selectOrDeselectFN,
} from "../../../HelperFunctions/MapComponent/MapKeyComponents";
import {
  useSpecimensArrayContextUpdater,
  useSpecimensArrayCountContext,
} from "../MapStateComponents/SpecimensArrayStateProvider";
import {
  DATES,
  SPECIES,
  OVERLAYS,
  SELECT_ALL,
  SORT_BY_SPECIES,
  SORT_BY_DATES,
  OVERLAYS_CAPITALIZED,
  UPDATING_INDIVIDUAL,
  DESELECT_ALL,
  EVENTS,
  EVENTS_CAPITALIZED,
  POINTS_OF_INTEREST_CAPITALIZED,
  POINTS_OF_INTEREST,
} from "../../../ConstantVariableNames";

export const MapKey = (props) => {
  const mapLegendContext = useMapLegendContext();
  const mapLegendContextUpdater = useMapLegendContextUpdater();
  const specimensArrayStateUpdater = useSpecimensArrayContextUpdater();
  const mapLegendFieldContextUpdater = useMapLegendFieldContextUpdater();
  const countObject = useSpecimensArrayCountContext();

  const handleStateChange = (statePropertyName) => (item) => () => {
    const { [statePropertyName]: stateObject } = mapLegendContext;
    const copyOfMapLegendObject = { ...mapLegendContext };

    const updatedStateObject = {
      [statePropertyName]: {
        ...stateObject,
        ...{ [item]: !stateObject[item] },
      },
    };

    mapLegendContextUpdater({
      type: UPDATING_INDIVIDUAL,
      payload: updatedStateObject,
    });

    const payload = {
      propertyName: item,
      prevStateCopy: copyOfMapLegendObject,
    };

    statePropertyName !== OVERLAYS &&
      specimensArrayStateUpdater({ type: statePropertyName, payload });
  };

  const handleSelectAll = (statePropertyName) => (state) => () => {
    const bool = selectOrDeselectFN(state);
    const copyOfMapLegendObject = { ...mapLegendContext };
    const updatedStateObject = {
      [statePropertyName]: { ...keyObject(statePropertyName, bool) },
    };
    mapLegendContextUpdater({
      type: SELECT_ALL,
      payload: updatedStateObject,
    });

    const payload = {
      propertyName: statePropertyName,
      prevStateCopy: copyOfMapLegendObject,
    };

    specimensArrayStateUpdater({
      type: bool ? SELECT_ALL : DESELECT_ALL,
      payload,
    });
  };

  const individualKeyObjectArray = [
    {
      titleText: SORT_BY_SPECIES,
      name: SPECIES,
      additionalProps: {
        checkboxComponentContainerStyles: speciesCheckboxContainerStyles,
      },
    },
    {
      titleText: SORT_BY_DATES,
      name: DATES,
      additionalProps: {},
    },
    {
      titleText: OVERLAYS_CAPITALIZED,
      name: OVERLAYS,
      additionalProps: {},
    },
    {
      titleText: EVENTS_CAPITALIZED,
      name: EVENTS,
      additionalProps: {},
    },
    {
      titleText: POINTS_OF_INTEREST_CAPITALIZED,
      name: POINTS_OF_INTEREST,
      additionalProps: {},
    },
  ];

  return (
    <Box sx={mapKeyContainerStyles}>
      <TextComponent text="Map Key" styles={mapLegendTitleStyles} />
      <Box sx={allIndividualKeysContainer}>
        {individualKeyObjectArray.map((item, index) => {
          return (
            <IndividualKey
              key={index}
              titleText={item.titleText}
              checkboxState={mapLegendContext[item.name]}
              setCheckboxState={handleStateChange(item.name)}
              handleSelectAll={handleSelectAll(item.name)}
              setUpdatedProperty={props.setUpdatedProperty}
              individualPropertyState={item.name}
              countObject={
                keysToCountArray.includes(item.name) ? countObject : null
              }
              contextFN={mapLegendFieldContextUpdater}
              {...item.additionalProps}
            />
          );
        })}
      </Box>
    </Box>
  );
};

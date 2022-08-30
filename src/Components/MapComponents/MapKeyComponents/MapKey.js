import React from "react";
import { Box } from "@mui/system";
import { TextComponent } from "../../ReusableComponents/TextComponent";
import {
  mapKeyContainerStyles,
  mapLegendTitleStyles,
  allIndividualKeysContainer,
} from "../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { IndividualKey } from "./IndividualKey";
import { returnSVGObjectItem } from "../../../HelperFunctions/General";
import { speciesCheckboxContainerStyles } from "../../../Styles/MapComponentStyles/MapKeyComponentStyles/SpeciesMapKeyStyles";
import {
  useMapLegendContext,
  useMapLegendContextUpdater,
} from "../MapStateComponents/MapLegendStateProvider";
import {
  speciesKeyObject,
  datesKeyObject,
  overlaysKeyObject,
  keyObject,
} from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";
import { selectOrDeselectFN } from "../../../HelperFunctions/MapComponent/MapKeyComponents";
import { svgObjectFN } from "../../../HelperFunctions/General";
import { speciesIconColorObject } from "../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents";
import { useSpecimensArrayContextUpdater } from "../MapStateComponents/SpecimensArrayStateProvider";

const functionSelectorObject = {
  species: speciesKeyObject,
  dates: datesKeyObject,
  overlays: overlaysKeyObject,
};

export const MapKey = (props) => {
  const mapLegendContext = useMapLegendContext();
  const mapLegendContextUpdater = useMapLegendContextUpdater();
  const specimensArrayStateUpdater = useSpecimensArrayContextUpdater();
  const handleStateChange = (statePropertyName) => (item) => () => {
    const { [statePropertyName]: stateObject } = mapLegendContext;

    const updatedStateObject = {
      [statePropertyName]: {
        ...stateObject,
        ...{ [item]: !stateObject[item] },
      },
    };

    mapLegendContextUpdater({
      type: "updating individual",
      payload: updatedStateObject,
    });

    specimensArrayStateUpdater({ type: statePropertyName, payload: item });
  };

  const handleSelectAll = (statePropertyName) => (state) => () => {
    const bool = selectOrDeselectFN(state);
    const updatedStateObject = {
      [statePropertyName]: { ...keyObject(statePropertyName, bool) },
    };
    mapLegendContextUpdater({
      type: "select all",
      payload: updatedStateObject,
    });
  };

  const individualKeyObjectArray = [
    {
      titleText: "Sort by Species",
      name: "species",
      additionalProps: {
        siblingElements: returnSVGObjectItem,
        svgObject: props.svgObject,
        checkboxComponentContainerStyles: speciesCheckboxContainerStyles,
      },
    },
    {
      titleText: "Sort by Dates",
      name: "dates",
      additionalProps: {},
    },
    {
      titleText: "Overlays",
      name: "overlays",
      additionalProps: {},
    },
  ];

  return (
    <Box sx={mapKeyContainerStyles}>
      <TextComponent text="Map Legend" styles={mapLegendTitleStyles} />
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
              {...item.additionalProps}
            />
          );
        })}
      </Box>
    </Box>
  );
};

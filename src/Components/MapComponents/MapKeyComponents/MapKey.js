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

export const MapKey = (props) => {
  return (
    <Box sx={mapKeyContainerStyles}>
      <TextComponent text="Map Legend" styles={mapLegendTitleStyles} />
      <Box sx={allIndividualKeysContainer}>
        <IndividualKey
          titleText="Sort by Species"
          checkboxState={props.speciesKeyState}
          setCheckboxState={props.setSpeciesKeyState}
          setUpdatedProperty={props.setUpdatedProperty}
          individualPropertyState="speciesKeyState"
          handleSelectAll={props.handleSelectAllSpecies}
          siblingElements={returnSVGObjectItem}
          svgObject={props.svgObject}
          checkboxComponentContainerStyles={speciesCheckboxContainerStyles}
        />
        <IndividualKey
          titleText="Sort by Dates"
          checkboxState={props.datesKeyState}
          setCheckboxState={props.setDatesKeyState}
          setUpdatedProperty={props.setUpdatedProperty}
          individualPropertyState="datesKeyState"
          handleSelectAll={props.handleSelectAllDates}
        />
        <IndividualKey
          titleText="Overlays"
          checkboxState={props.overlaysKeyState}
          setCheckboxState={props.setOverlaysKeyState}
          setUpdatedProperty={props.setUpdatedProperty}
          individualPropertyState="overlaysKeyState"
        />
      </Box>
    </Box>
  );
};

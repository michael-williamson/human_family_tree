import { Box } from "@mui/system";
import { TextComponent } from "../../ReusableComponents/TextComponent";
import {
  mapKeyContainerStyles,
  mapLegendTitleStyles,
  allIndividualKeysContainer,
  mapLegendTitleContainerStyles,
  mapLegendTitleImageContainer,
} from "../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { IndividualKey } from "./IndividualKey";
import { speciesCheckboxContainerStyles } from "../../../Styles/MapComponentStyles/MapKeyComponentStyles/SpeciesMapKeyStyles";
import {
  useMapLegendContext,
  useMapLegendContextUpdater,
  useMapLegendFieldContextUpdater,
} from "../MapStateComponents/MapLegendStateProvider";
import {
  DATES,
  SPECIES,
  OVERLAYS,
  SORT_BY_SPECIES,
  SORT_BY_DATES,
  OVERLAYS_CAPITALIZED,
  UPDATING_INDIVIDUAL,
} from "../../../ConstantVariableNames";
import { CardMedia } from "@mui/material";
import { mapKeyIcon } from "../../../Media/PageTitle_Navigation_Icons";

export const MapKey = ({ hideMapKey, setUpdatedProperty }) => {
  const mapLegendContext = useMapLegendContext();
  const mapLegendContextUpdater = useMapLegendContextUpdater();
  const mapLegendFieldContextUpdater = useMapLegendFieldContextUpdater();

  const handleStateChange = propertyName => fieldName => e => {
    const payloadMapKeyContext = {
      propertyName,
      fieldName,
    };

    mapLegendContextUpdater({
      type: UPDATING_INDIVIDUAL,
      payload: payloadMapKeyContext,
    });
  };

  const handleSelectAll =
    propertyName =>
    ({ selectAllText }) =>
    () => {
      mapLegendContextUpdater({
        type: selectAllText,
        payload: { propertyName, item: null },
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
    // {
    //   titleText: EVENTS_CAPITALIZED,
    //   name: EVENTS,
    //   additionalProps: {},
    // },
    // {
    //   titleText: ENTRY_EXIT_POINTS_TITLE,
    //   name: ENTRY_EXIT_POINTS,
    //   additionalProps: {},
    // },
  ];

  const mapKeyContainerStylesObject = hideMapKey
    ? { ...mapKeyContainerStyles, visibility: "hidden" }
    : mapKeyContainerStyles;

  return (
    <Box sx={mapKeyContainerStylesObject}>
      <Box sx={mapLegendTitleContainerStyles}>
        <TextComponent styles={mapLegendTitleStyles}>Map Key</TextComponent>
        <Box sx={mapLegendTitleImageContainer}>
          <CardMedia component="img" src={mapKeyIcon} />
        </Box>
      </Box>
      <Box sx={allIndividualKeysContainer}>
        {/* <SearchComponent searchableArray={specimensArray} /> */}
        {individualKeyObjectArray.map((item, index) => {
          return (
            <IndividualKey
              key={index}
              inputProps={{ "data-category": item.name }}
              titleText={item.titleText}
              checkboxState={mapLegendContext[item.name]}
              setCheckboxState={handleStateChange(item.name)}
              handleSelectAll={handleSelectAll(item.name)}
              setUpdatedProperty={setUpdatedProperty}
              individualPropertyState={item.name}
              countObject={null}
              contextFN={mapLegendFieldContextUpdater}
              {...item.additionalProps}
            />
          );
        })}
      </Box>
    </Box>
  );
};

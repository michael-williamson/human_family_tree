import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, Collapse } from "@mui/material";
import { MapKey } from "../MapKeyComponents/MapKey";
import { GoogleMapComponent } from "./GoogleMapComponent";
import {
  mapContainerStyles,
  showMapKeyButtonStyles,
} from "../../../Styles/MapComponentStyles/MapContainerStyles";
import specimensArray from "../../../Data/anthroData.json";
import { svgObjectFN } from "../../../HelperFunctions/General";
import { speciesIconColorObjectFN } from "../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents";
import { MapLegendStateProvider } from "../MapStateComponents/MapLegendStateProvider";
import { SpecimensArrayStateProvider } from "../MapStateComponents/SpecimensArrayStateProvider";

const speciesIconColorObject = speciesIconColorObjectFN(
  specimensArray,
  "species"
);

const svgObject = svgObjectFN(speciesIconColorObject, {
  width: 40,
  height: 40,
});

export const MapContainer = () => {
  const [showMapKey, setShowMapKey] = useState(true);
  const [currentItem, setCurrentItem] = useState({});
  // const [updatedProperty, setUpdatedProperty] = useState({
  //   species: "",
  //   dates: "",
  //   overlays: "",
  // });

  // The following useEffect hooks represent synchronous state changes to the specimensArrayState
  // When a checkbox is selected in the MapKey the updatedProperty object which is a state of MapContainer
  // is changed to the label of the checkbox which also corresponds to properties of objects in the HelperFunctions
  // folder.  This specific property naming allows the evaluation of the specimensArrayState with only one condition at a time
  // thus cutting down on computations.  useEffect with its dependencies allow the evaluations to happen synchronously
  // therefore created non conflicting updates that are independent of each other.
  // PART 1
  // useEffect(() => {
  //   const allTrue =
  //     Object.values(species).length ===
  //     Object.values(species).filter((item) => item === true).length;
  //   const allFalse =
  //     Object.values(species).filter((item) => item === true).length === 0;
  //   allTrue && setSpecimensArrayState([...specimensArray]);
  //   allFalse && setSpecimensArrayState([]);
  //   if (!updatedProperty.species) return;
  //   const bool = species[updatedProperty.species];
  //   bool &&
  //     setSpecimensArrayState((prev) => {
  //       return [
  //         ...prev,
  //         ...specimensArray.filter(
  //           (item) => item.species === updatedProperty.species
  //         ),
  //       ];
  //     });

  //   !bool &&
  //     setSpecimensArrayState((prev) => {
  //       return [
  //         ...prev.filter((item) => item.species !== updatedProperty.species),
  //       ];
  //     });
  // }, [species, updatedProperty.species]);
  // // PART 2
  // useEffect(() => {
  //   const allTrue =
  //     Object.values(dates).length ===
  //     Object.values(dates).filter((item) => item === true).length;
  //   const allFalse =
  //     Object.values(dates).filter((item) => item === true).length === 0;
  //   allTrue && setSpecimensArrayState([...specimensArray]);
  //   allFalse && setSpecimensArrayState([]);

  //   if (!updatedProperty.dates) return;

  //   const bool = dates[updatedProperty.dates];
  //   bool &&
  //     setSpecimensArrayState((prev) => {
  //       return [
  //         ...prev,
  //         ...specimensArray.filter(
  //           (item) =>
  //             item.wholeNumberYears >
  //               datesCategoryObj[updatedProperty.dates].lesser &&
  //             item.wholeNumberYears <
  //               datesCategoryObj[updatedProperty.dates].greater
  //         ),
  //       ];
  //     });

  //   !bool &&
  //     setSpecimensArrayState((prev) => {
  //       const copy = [...prev];
  //       return [
  //         ...copy.filter(
  //           (item) =>
  //             item.wholeNumberYears <
  //               datesCategoryObj[updatedProperty.dates].lesser ||
  //             item.wholeNumberYears >
  //               datesCategoryObj[updatedProperty.dates].greater
  //         ),
  //       ];
  //     });
  // }, [dates, updatedProperty.dates]);

  const handleShowMapKey = () => {
    setShowMapKey(!showMapKey);
  };

  // const setUpdatedPropertyFN = (individualPropertyState, item) => {
  //   setUpdatedProperty((prev) => {
  //     const copy = { ...prev };
  //     copy[individualPropertyState] = item;
  //     return copy;
  //   });
  // };

  // const checkboxStateHandler =
  //   (setCheckboxState, individualPropertyState) => (item) => (e) => {
  //     setUpdatedPropertyFN(individualPropertyState, item);
  //   };

  const handleMarkerClick = (item) => (markerClick) => (e) => {
    markerClick && setCurrentItem(item);
  };

  const handleCloseInfoWindowClick = () => {
    setCurrentItem({});
  };

  return (
    <Box sx={mapContainerStyles}>
      <SpecimensArrayStateProvider>
        <MapLegendStateProvider>
          <GoogleMapComponent
            speciesIconColorObject={speciesIconColorObject}
            handleMarkerClick={handleMarkerClick}
            currentItem={currentItem}
            handleCloseInfoWindowClick={handleCloseInfoWindowClick}
          />

          <Button onClick={handleShowMapKey} sx={showMapKeyButtonStyles}>
            {showMapKey ? "Hide Map Key" : "Show Map Key"}
          </Button>
          <Collapse in={showMapKey}>
            <MapKey svgObject={svgObject} />
          </Collapse>
        </MapLegendStateProvider>
      </SpecimensArrayStateProvider>
    </Box>
  );
};

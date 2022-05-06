import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, Collapse } from "@mui/material";
import { MapKey } from "../MapKeyComponents/MapKey";
import {
  speciesKeyObject,
  datesKeyObject,
  overlaysKeyObject,
} from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";
import { GoogleMapComponent } from "./GoogleMapComponent";
import {
  mapContainerStyles,
  showMapKeyButtonStyles,
} from "../../../Styles/MapComponentStyles/MapContainerStyles";
import specimensArray from "../../../Data/anthroData.json";
import {
  datesCategoryObj,
  svgObjectFN,
} from "../../../HelperFunctions/General";
import { speciesIconColorObjectFN } from "../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents";

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
  const [speciesKeyState, setSpeciesKeyState] = useState(speciesKeyObject());
  const [datesKeyState, setDatesKeyState] = useState(datesKeyObject());
  const [overlaysKeyState, setOverlaysKeyState] = useState(overlaysKeyObject());
  const [currentItem, setCurrentItem] = useState({});
  const [updatedProperty, setUpdatedProperty] = useState({
    speciesKeyState: "",
    datesKeyState: "",
    overlaysKeyState: "",
  });
  const [specimensArrayState, setSpecimensArrayState] =
    useState(specimensArray);

  // The following useEffect hooks represent synchronous state changes to the specimensArrayState
  // When a checkbox is selected in the MapKey the updatedProperty object which is a state of MapContainer
  // is changed to the label of the checkbox which also corresponds to properties of objects in the HelperFunctions
  // folder.  This specific property naming allows the evaluation of the specimensArrayState with only one condition at a time
  // thus cutting down on computations.  useEffect with its dependencies allow the evaluations to happen synchronously
  // therefore created non conflicting updates that are independent of each other.
  // PART 1
  useEffect(() => {
    const allTrue =
      Object.values(speciesKeyState).length ===
      Object.values(speciesKeyState).filter((item) => item === true).length;
    const allFalse =
      Object.values(speciesKeyState).filter((item) => item === true).length ===
      0;
    allTrue && setSpecimensArrayState([...specimensArray]);
    allFalse && setSpecimensArrayState([]);
    if (!updatedProperty.speciesKeyState) return;
    const bool = speciesKeyState[updatedProperty.speciesKeyState];
    bool &&
      setSpecimensArrayState((prev) => {
        return [
          ...prev,
          ...specimensArray.filter(
            (item) => item.species === updatedProperty.speciesKeyState
          ),
        ];
      });

    !bool &&
      setSpecimensArrayState((prev) => {
        return [
          ...prev.filter(
            (item) => item.species !== updatedProperty.speciesKeyState
          ),
        ];
      });
  }, [speciesKeyState, updatedProperty.speciesKeyState]);
  // PART 2
  useEffect(() => {
    const allTrue =
      Object.values(datesKeyState).length ===
      Object.values(datesKeyState).filter((item) => item === true).length;
    const allFalse =
      Object.values(datesKeyState).filter((item) => item === true).length === 0;
    allTrue && setSpecimensArrayState([...specimensArray]);
    allFalse && setSpecimensArrayState([]);

    if (!updatedProperty.datesKeyState) return;

    const bool = datesKeyState[updatedProperty.datesKeyState];
    bool &&
      setSpecimensArrayState((prev) => {
        return [
          ...prev,
          ...specimensArray.filter(
            (item) =>
              item.wholeNumberYears >
                datesCategoryObj[updatedProperty.datesKeyState].lesser &&
              item.wholeNumberYears <
                datesCategoryObj[updatedProperty.datesKeyState].greater
          ),
        ];
      });

    !bool &&
      setSpecimensArrayState((prev) => {
        const copy = [...prev];
        return [
          ...copy.filter(
            (item) =>
              item.wholeNumberYears <
                datesCategoryObj[updatedProperty.datesKeyState].lesser ||
              item.wholeNumberYears >
                datesCategoryObj[updatedProperty.datesKeyState].greater
          ),
        ];
      });
  }, [datesKeyState, updatedProperty.datesKeyState]);

  const handleShowMapKey = () => {
    setShowMapKey(!showMapKey);
  };

  const handleSelectAll = (setSelectAllFN) => (selectOrDeselectFN) => (e) => {
    const newObject = {};
    setSelectAllFN((prev) => {
      const properties = Object.keys(prev);
      properties.forEach((item) => (newObject[item] = selectOrDeselectFN));
      return newObject;
    });
  };

  const setUpdatedPropertyFN = (individualPropertyState, item) => {
    setUpdatedProperty((prev) => {
      const copy = { ...prev };
      copy[individualPropertyState] = item;
      return copy;
    });
  };

  const checkboxStateHandler =
    (setCheckboxState, individualPropertyState) => (item) => (e) => {
      setCheckboxState((prev) => {
        const copy = { ...prev };
        copy[item] = !copy[item];
        return copy;
      });
      setUpdatedPropertyFN(individualPropertyState, item);
    };

  const handleMarkerClick = (item) => (markerClick) => (e) => {
    markerClick && setCurrentItem(item);
  };

  const handleCloseInfoWindowClick = () => {
    setCurrentItem({});
  };

  return (
    <Box sx={mapContainerStyles}>
      <GoogleMapComponent
        specimensArrayState={specimensArrayState}
        polygonVisibilityState={overlaysKeyState}
        speciesIconColorObject={speciesIconColorObject}
        handleMarkerClick={handleMarkerClick}
        currentItem={currentItem}
        handleCloseInfoWindowClick={handleCloseInfoWindowClick}
      />
      <Button onClick={handleShowMapKey} sx={showMapKeyButtonStyles}>
        {showMapKey ? "Hide Map Key" : "Show Map Key"}
      </Button>
      <Collapse in={showMapKey}>
        <MapKey
          speciesKeyState={speciesKeyState}
          setSpeciesKeyState={checkboxStateHandler(
            setSpeciesKeyState,
            "speciesKeyState"
          )}
          datesKeyState={datesKeyState}
          setDatesKeyState={checkboxStateHandler(
            setDatesKeyState,
            "datesKeyState"
          )}
          overlaysKeyState={overlaysKeyState}
          setOverlaysKeyState={checkboxStateHandler(
            setOverlaysKeyState,
            "overlaysKeyState"
          )}
          handleSelectAllDates={handleSelectAll(setDatesKeyState)}
          handleSelectAllSpecies={handleSelectAll(setSpeciesKeyState)}
          svgObject={svgObject}
        />
      </Collapse>
    </Box>
  );
};

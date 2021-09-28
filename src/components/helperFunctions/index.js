import { latLngObj } from "../mapComponents/pathsForPolygon";
import {
  datesCategoryObj,
  europeanGlacialTimeline,
  iceAgeDatesArr,
} from "../../data/listArrays";

import anthroData from "../../data/anthroData.json";

export const dateComparer = (
  compareDateGreater,
  compareDateLesser,
  inputDate
) => {
  return compareDateGreater >= inputDate && inputDate >= compareDateLesser;
};

export const filterIceAgeDates = (
  checked,
  iceAgeChecked,
  setIceAgeChecked,
  currentProp
) => {
  const obj = {};
  for (const prop of iceAgeDatesArr) {
    let currentMidpoint =
      datesCategoryObj[currentProp].greater -
      datesCategoryObj[currentProp].lesser;
    currentMidpoint = currentMidpoint / 2;
    currentMidpoint = currentMidpoint + datesCategoryObj[currentProp].lesser;
    if (
      dateComparer(
        datesCategoryObj[currentProp].greater,
        datesCategoryObj[currentProp].lesser,
        europeanGlacialTimeline[prop].greater
      ) ||
      dateComparer(
        datesCategoryObj[currentProp].greater,
        datesCategoryObj[currentProp].lesser,
        europeanGlacialTimeline[prop].lesser
      ) ||
      dateComparer(
        europeanGlacialTimeline[prop].greater,
        europeanGlacialTimeline[prop].lesser,
        currentMidpoint
      )
    ) {
      obj[prop] = checked;
    } else {
      obj[prop] = iceAgeChecked[prop];
    }
  }
  setIceAgeChecked({ ...iceAgeChecked, ...obj });
};

export const filterDates = (event, datesChecked) => {
  const obj = {};
  for (const prop in datesChecked) {
    let currentMidpoint =
      datesCategoryObj[prop].greater - datesCategoryObj[prop].lesser;
    currentMidpoint = currentMidpoint / 2;
    currentMidpoint = currentMidpoint + datesCategoryObj[prop].lesser;
    if (
      event.target.checked &&
      (dateComparer(
        datesCategoryObj[prop].greater,
        datesCategoryObj[prop].lesser,
        europeanGlacialTimeline[event.target.name].greater
      ) ||
        dateComparer(
          datesCategoryObj[prop].greater,
          datesCategoryObj[prop].lesser,
          europeanGlacialTimeline[event.target.name].lesser
        ) ||
        dateComparer(
          europeanGlacialTimeline[event.target.name].greater,
          europeanGlacialTimeline[event.target.name].lesser,
          currentMidpoint
        ))
    ) {
      obj[prop] = true;
    } else {
      obj[prop] = false;
    }
  }
  return obj;
};

export const checkedObject = (bool, array) => {
  const obj = {};
  array.forEach((item) => {
    if (bool) obj[item] = true;
    else obj[item] = false;
  });
  return obj;
};

//functions for DrawingManager component in MapComponent
export const onDrawingManagerLoad = (drawingManager) => {
  console.log(drawingManager, "drawing manager");
};

export const onPolygonComplete = (polygon) => {
  const latLngObjMaker = latLngObj;
  const arr = [];
  const coordinates = [];
  arr.push(polygon);
  const bounds = polygon.getPath();
  for (let i = 0; i < bounds.length; i++) {
    coordinates.push(
      latLngObjMaker(bounds.getAt(i).lat(), bounds.getAt(i).lng())
    );
  }
  console.log(coordinates, "polygon complete");
};

export const populateSpeciesObject = () => {
  const speciesObject = {};
  anthroData.forEach((item) => {
    if (speciesObject[item.species]) {
      speciesObject[item.species].push(item);
    } else {
      speciesObject[item.species] = [];
      speciesObject[item.species].push(item);
    }
  });
  return speciesObject;
};

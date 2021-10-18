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
  return compareDateGreater > inputDate && inputDate > compareDateLesser;
};

//updates datesCorresponding state after date change
export const updateCorrespondingAfterDateChange = (...props) => {
  const [
    event,
    datesCorrespondingData,
    setIceAgeChecked,
    setDatesCorrespondingData,
  ] = props;
  const targetName = event.target.name;
  const iceAgePropName = datesCorrespondingData[targetName];
  const datesCorrespondingIceAgeObj = datesCorrespondingData[iceAgePropName];
  if (event.target.checked === false && datesCorrespondingIceAgeObj) {
    setIceAgeChecked((prev) => {
      return { ...prev, [iceAgePropName]: false };
    });
    const datesCorrespondingMergeObject = {
      [iceAgePropName]: {
        ...datesCorrespondingIceAgeObj,
        counter:
          datesCorrespondingIceAgeObj.counter > 1
            ? datesCorrespondingIceAgeObj.counter - 1
            : 0,
      },
    };

    setDatesCorrespondingData((prev) => {
      return { ...prev, ...datesCorrespondingMergeObject };
    });
  } else if (event.target.checked && datesCorrespondingIceAgeObj) {
    //***set length variable to account for array lengths that are equal to one...since
    //***counter is coming off of a potential 0 this is important
    const length =
      datesCorrespondingIceAgeObj.arrOfDates.length === 1
        ? 1
        : datesCorrespondingIceAgeObj.arrOfDates.length - 1;
    //***length can be either 1 or array length minus 1 depending on prior assignment
    length === datesCorrespondingIceAgeObj.counter &&
      setIceAgeChecked((prev) => {
        return { ...prev, [iceAgePropName]: true };
      });
    //***set counterValue to either length plus one(make up for subtraction earlier) or increment by one
    const counterValue =
      length === datesCorrespondingIceAgeObj.counter
        ? length + 1
        : datesCorrespondingIceAgeObj.counter + 1;
    const datesCorrespondingMergeObject = {
      [iceAgePropName]: {
        ...datesCorrespondingIceAgeObj,
        counter: counterValue,
      },
    };
    setDatesCorrespondingData((prev) => {
      return { ...prev, ...datesCorrespondingMergeObject };
    });
  }
};

//updates after selectAll button is clicked in MainCheckboxComp
export const updateCounterCorrespondingDateObj = (...props) => {
  const [state, setState, selectAll] = props;
  const mergerWithStateObject = {};
  iceAgeDatesArr.forEach((item) => {
    const stateItem = state[item];
    mergerWithStateObject[item] = {
      ...stateItem,
      counter: selectAll ? stateItem.arrOfDates.length : 0,
    };
  });
  setState((prev) => {
    return { ...prev, ...mergerWithStateObject };
  });
};

//function that produces the datesCorrespondingData state on after first render
export const datesCorrespondingDataObj = () => {
  const obj = {};
  for (const currentProp in datesCategoryObj) {
    let currentMidpoint =
      datesCategoryObj[currentProp].greater -
      datesCategoryObj[currentProp].lesser;
    currentMidpoint = currentMidpoint / 2;
    currentMidpoint = currentMidpoint + datesCategoryObj[currentProp].lesser;
    for (const prop in europeanGlacialTimeline) {
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
        obj[currentProp] = prop;
        if (!obj[prop]) {
          obj[prop] = {};
          obj[prop].arrOfDates = [currentProp];
          obj[prop].counter = 1;
        } else {
          obj[prop].arrOfDates.push(currentProp);
          obj[prop].counter++;
        }
      }
    }
  }
  return obj;
};

//function for setting animation-play-state
export const animationPlayState = (...props) => {
  // iterableState will be either iceAgeChecked or playState
  const [setPlayState, iterableState, event] = props;
  const { name, checked } = event.target;

  //iceage Function
  if (name === "greenSahara" || name === "greenArabia") {
    //beginning of desert animation play state
    const stateObj = {};
    //iterable state is playState
    for (const props in iterableState) {
      if (name !== props) {
        stateObj[props] = "paused";
      } else {
        stateObj[name] = "running";
      }
    }
    setPlayState((prevProps) => {
      return { ...prevProps, ...stateObj };
    });
  } else {
    const counter = { true: 0, false: 0 };
    //iterableState will be iceAgeChecked
    for (const prop in iterableState) {
      iterableState[prop]
        ? (counter.true = counter.true + 1)
        : (counter.false = counter.false + 1);
    }

    checked &&
      counter.true === 0 &&
      setPlayState((prev) => {
        return {
          ...prev,
          greenArabia: "paused",
          greenSahara: "paused",
          iceAge: "running",
        };
      });
    checked === false &&
      counter.true === 1 &&
      setPlayState((prev) => {
        return {
          ...prev,
          greenArabia: "paused",
          greenSahara: "paused",
          iceAge: "running",
        };
      });
    checked &&
      counter.true >= 1 &&
      setPlayState((prev) => {
        return {
          ...prev,
          greenArabia: "paused",
          greenSahara: "paused",
          iceAge: "paused",
        };
      });
    //end of iceAge fn
  }
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
    } else if (
      !event.target.checked &&
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

import { latLngObj } from "../mapPage/mapComponents/pathsForPolygon";

import anthroData from "../../data/anthroData.json";
import events from "../../data/events.json";
import { speciesArr, speciesColors } from "../../data/listArrays";

export const dateComparer = (
  compareDateGreater,
  compareDateLesser,
  inputDate
) => {
  return compareDateGreater > inputDate && inputDate > compareDateLesser;
};

const datesComparisonArray = [
  1, 10000, 10001, 20000, 20001, 30000, 30001, 40000, 40001, 50000, 50001,
  70000, 70001, 100000, 100001, 200000, 200001, 300000, 300001, 400000, 400001,
  500000, 500001, 600000, 600001, 800000, 800001, 1000000, 1000001, 1500000,
  1500001, 2000000, 2000001, 4000000,
];

export const comparatorMain = (inputProp) => {
  const mid = datesComparisonArray.length / 2;
  const quad = Math.floor(datesComparisonArray.length / 4);
  const input = inputProp;
  let quadState = false;
  let currentIndexGreater = 0;
  let currentIndexLesser = 0;
  return function comparator() {
    if (
      quadState === false &&
      ((input >= datesComparisonArray[mid] &&
        input < datesComparisonArray[mid + quad]) ||
        (input <= datesComparisonArray[mid] &&
          input > datesComparisonArray[mid - quad]))
    ) {
      quadState = true;
      currentIndexGreater = mid;
      currentIndexLesser = currentIndexGreater - 1;
      comparator();
    } else if (
      quadState === false &&
      input >= datesComparisonArray[mid + quad]
    ) {
      quadState = true;
      currentIndexGreater = mid + quad;
      currentIndexLesser = currentIndexGreater - 1;
      comparator();
    } else if (
      quadState === false &&
      input <= datesComparisonArray[mid - quad]
    ) {
      quadState = true;
      currentIndexGreater = mid - quad;
      currentIndexLesser = currentIndexGreater - 1;
      comparator();
    } else if (quadState && input > datesComparisonArray[currentIndexGreater]) {
      currentIndexGreater += 2;
      currentIndexLesser += 2;
      comparator();
    } else if (quadState && input < datesComparisonArray[currentIndexLesser]) {
      currentIndexGreater -= 2;
      currentIndexLesser -= 2;
      comparator();
    }
    return datesComparisonArray[currentIndexGreater];
  };
};

const iceAgeDatesComparatorArr = [
  13001, 60000, 140001, 350000, 500001, 640000, 780001, 900000, 1300001,
  1500000,
];

export const comparatorIceAgeDates = (inputStack) => {
  const mid = iceAgeDatesComparatorArr.length / 2;
  const inputStackArr = inputStack;
  let input = inputStackArr.pop();
  let currentIndexGreater = mid;
  let currentIndexLesser = mid - 1;
  let match = false;
  return function comparator() {
    if (
      (input > iceAgeDatesComparatorArr[currentIndexGreater] &&
        input < iceAgeDatesComparatorArr[currentIndexGreater + 1]) ||
      (input > iceAgeDatesComparatorArr[currentIndexLesser - 1] &&
        input < iceAgeDatesComparatorArr[currentIndexLesser])
    ) {
      input = inputStackArr.length > 0 ? inputStackArr.pop() : 0;
      currentIndexGreater = mid;
      currentIndexLesser = mid - 1;
      input && comparator();
    } else if (
      input > iceAgeDatesComparatorArr[currentIndexGreater] &&
      input >= iceAgeDatesComparatorArr[currentIndexGreater + 1]
    ) {
      currentIndexGreater += 2;
      currentIndexLesser += 2;
      comparator();
    } else if (
      input < iceAgeDatesComparatorArr[currentIndexLesser] &&
      input <= iceAgeDatesComparatorArr[currentIndexLesser - 1]
    ) {
      currentIndexGreater -= 2;
      currentIndexLesser -= 2;
      comparator();
    } else if (
      input <= iceAgeDatesComparatorArr[currentIndexGreater] &&
      input >= iceAgeDatesComparatorArr[currentIndexLesser]
    ) {
      match = true;
    } else if (inputStack.length > 1) {
      input = inputStack.pop();
      currentIndexGreater = mid;
      currentIndexLesser = mid - 1;
      comparator();
    }
    return match && iceAgeDatesComparatorArr[currentIndexGreater];
  };
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

export const colorGenerator = (length, opacity1, opacity2) => {
  const colorArray = [[], []];
  const colorRandomizer = () => {
    let randomNum = Math.random() * 255;
    randomNum = Math.ceil(randomNum);
    return randomNum;
  };

  for (let i = 0; i < length; i++) {
    let r, g, b;
    r = colorRandomizer();
    g = colorRandomizer();
    b = colorRandomizer();
    colorArray[0].push(`rgba(${r},${g},${b},${opacity1})`);
    colorArray[1].push(`rgba(${r},${g},${b},${opacity2})`);
  }
  return colorArray;
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

export const iconColorGen = () => {
  const length = speciesArr.length;
  const speciesColorObj = {};
  for (let i = 0; i < length; i++) {
    speciesColorObj[speciesArr[i]] = speciesColors[i];
  }
  return speciesColorObj;
};

export const eventsImageObjectFn = () => {
  const eventsImageObject = {};
  for (const element of events) {
    eventsImageObject[element.eventName] = element.linksToPhotos[0];
  }
  return eventsImageObject;
};

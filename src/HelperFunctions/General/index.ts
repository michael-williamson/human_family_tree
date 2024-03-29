
import {

  EUROPEAN_ICE_SHEET,
  GREEN_ARABIA,
  GREEN_SAHARA,
  LAKE_TOBA_ERUPTION,
  NORTH_AMERICAN_ICE_SHEET,
  SAHUL,
  SUNDALAND,
} from "../../ConstantVariableNames";
import {
  arabiaPaths,
  iceAgeEurope2Paths,
  laurentideIceSheetPaths,
  saharaPaths,
  sahulPaths,
  sundalandPaths,
} from "../MapComponent/GoogleMapsComponent/PolygonCoordinates";

export const speciesArr = [
  "habilis",
  "rudolfensis",
  "erectus",
  "floresiensis",
  "luzonensis",
  "antecessor",
  "heidelbergensis",
  "neanderthalensis",
  "denisovan",
  "Red Deer Cave People",
  "sapiens",
  "longi",
];

export const datesArr = [
  "> 2,000,000",
  "2,000,000 - 1,500,000",
  "1,500,000 - 1,000,000",
  "1,000,000 - 800,000",
  "800,000 - 700,000",
  "700,000 - 600,000",
  "600,000 - 500,000",
  "500,000 - 400,000",
  "400,000 - 300,000",
  "300,000 - 200,000",
  "200,000 - 100,000",
  "100,000 - 70,000",
  "70,000 - 50,000",
  "50,000 - 40,000",
  "40,000 - 30,000",
  "30,000 - 20,000",
  "20,000 - 10,000",
  "10,000 - present",
];

export const overlaysArray = [
  SAHUL,
  SUNDALAND,
  GREEN_SAHARA,
  GREEN_ARABIA,
  NORTH_AMERICAN_ICE_SHEET,
  EUROPEAN_ICE_SHEET,
  LAKE_TOBA_ERUPTION,
];

export const greenOverlays = [SAHUL, SUNDALAND, GREEN_SAHARA, GREEN_ARABIA];

export const whiteOverlays = [NORTH_AMERICAN_ICE_SHEET, EUROPEAN_ICE_SHEET];

export const greenFill = {
  fillColor: "rgb(81 101 74 / 75%)",
  strokeColor: "rgb(81 101 74 / 75%)",
};

export const iceFill = {
  fillColor: "rgb(246 246 246 / 60%)",
  strokeColor: "white",
};

export const polygonOptions = {
  fillOpacity: 1,
  strokeOpacity: 1,
  geodesic: true,
  zIndex: 1,
};

export const overlaysObjectConversion = ({ arr, styleObject }:any) => {
  const object:{[key:string]:any} = {};
  const arrayLooper = (arr:any, styleObject:any) =>
    arr.forEach((item:any) => (object[item] = { ...polygonOptions, ...styleObject }));
  arrayLooper(arr, styleObject);
  return object;
};

export const correspondingPolygonPathsObject = {
  [SAHUL]: sahulPaths,
  [SUNDALAND]: sundalandPaths,
  [GREEN_SAHARA]: saharaPaths,
  [GREEN_ARABIA]: arabiaPaths,
  [NORTH_AMERICAN_ICE_SHEET]: laurentideIceSheetPaths,
  [EUROPEAN_ICE_SHEET]: iceAgeEurope2Paths,
};

export const greenFillObject = overlaysObjectConversion({
  arr: greenOverlays,
  styleObject: greenFill,
});
export const whiteFillObject = overlaysObjectConversion({
  arr: whiteOverlays,
  styleObject: iceFill,
});

export const eventsArray = [LAKE_TOBA_ERUPTION];

//corresponding lesser and greater dates for each property, each property will act as labels for checkboxes and other user interface displays
export const datesCategoryObj = {
  "> 2,000,000": { greater: 4000000, lesser: 2000000 },
  "2,000,000 - 1,500,000": { greater: 2000000, lesser: 1500000 },
  "1,500,000 - 1,000,000": { greater: 1500000, lesser: 1000000 },
  "1,000,000 - 800,000": { greater: 1000000, lesser: 800000 },
  "800,000 - 700,000": { greater: 800000, lesser: 700000 },
  "700,000 - 600,000": { greater: 700000, lesser: 600000 },
  "600,000 - 500,000": { greater: 600000, lesser: 500000 },
  "500,000 - 400,000": { greater: 500000, lesser: 400000 },
  "400,000 - 300,000": { greater: 400000, lesser: 300000 },
  "300,000 - 200,000": { greater: 300000, lesser: 200000 },
  "200,000 - 100,000": { greater: 200000, lesser: 100000 },
  "100,000 - 70,000": { greater: 100000, lesser: 70000 },
  "70,000 - 50,000": { greater: 70000, lesser: 50000 },
  "50,000 - 40,000": { greater: 50000, lesser: 40000 },
  "40,000 - 30,000": { greater: 40000, lesser: 30000 },
  "30,000 - 20,000": { greater: 30000, lesser: 20000 },
  "20,000 - 10,000": { greater: 20000, lesser: 10000 },
  "10,000 - present": { greater: 10000, lesser: 0 },
};

let rgbRandomNumberRounded = () => Math.floor(Math.random() * 256);

export const randomColorGenerator = (transparency:any) =>
  `rgba(${rgbRandomNumberRounded()},${rgbRandomNumberRounded()},${rgbRandomNumberRounded()}${
    transparency ? `,${1 * Math.random()}` : ""
  })`;

// export const svgObjectFN = (colorObject:any, svgObject:any) => {
//   const objectToConstruct:{[key:string]:any} = {};
//   Object.keys(colorObject).forEach(item => {
//     objectToConstruct[item] = (
//       <Box sx={{ cursor: "pointer" }}>
//         <svg
//           width={svgObject.width}
//           height={svgObject.height}
//           display="inline-block"
//         >
//           <circle
//             cx={svgObject.width / 2}
//             cy={svgObject.height / 2}
//             r="10"
//             stroke={colorObject[item]}
//             strokeWidth="3"
//             fill={colorObject[item]}
//           />
//         </svg>
//       </Box>
//     );
//   });
//   return { ...objectToConstruct };
// };

// export const returnSVGObjectItem = (svgObject, item) => {
//   return svgObject[item];
// };

// export const objectDestructured = (object, property) => {
//   return object[property];
// };

export const conditionsEqual = (
  conditionsEqual:any,
  conditionOne:any,
  conditionTwo:any
) => {
  return conditionsEqual
    ? conditionOne === conditionTwo
    : conditionOne !== conditionTwo;
};

// export const filterType = (
//   type: any,
//   item: any,
//   conditionOne: any,
//   conditionTwo: any,
//   conditionsEqual: (arg0: any, arg1: any, arg2: undefined) => any
// ) => {
//   switch (type) {
//     case DESTRUCTURE_ONE:
//       return conditionsEqual(
//         conditionsEqual,
//         objectDestructured(item, conditionOne),
//         conditionTwo
//       );
//     case DESTRUCTURE_TWO:
//       return conditionsEqual(
//         conditionsEqual,
//         conditionOne,
//         objectDestructured(item, conditionTwo)
//       );
//     case DESTRUCTURE_BOTH:
//       return conditionsEqual(
//         objectDestructured(item, conditionOne),
//         objectDestructured(item, conditionTwo)
//       );

//     default:
//       break;
//   }
// };

// export const arrayFilter = (
//   arr,
//   conditionOne,
//   conditionTwo,
//   destructure,
//   conditionsEqual
// ) => {
//   return arr.filter(item => {
//     return filterType(
//       destructure,
//       item,
//       conditionOne,
//       conditionTwo,
//       conditionsEqual
//     );
//   });
// };

export const countLabelCreator = (labelText: any, addOn: any) => {
  // $*$_ in this case addOn will be the count object from the
  // --> count state provider
  return `${labelText} (${addOn})`;
};

export const labelCreator = (labelText: any, addOn: any) => {
  if (typeof addOn === "number") {
    return `${labelText} (${addOn})`;
  }
  return labelText;
};

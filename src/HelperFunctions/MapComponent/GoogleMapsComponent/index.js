import { PolygonComponent } from "../../../Components/MapComponents/GoogleMapComponents/PolygonComponent";
import {
  greenFill,
  iceFill,
  polygonOptions,
} from "../../../Styles/MapComponentStyles/GoogleMapComponentStyles";
import { overlaysArray } from "../../General";
import {
  saharaPaths,
  arabiaPaths,
  iceAgeEurope2Paths,
  laurentideIceSheetPaths,
} from "./PolygonCoordinates";

// The order here must match the order in overlaysArray.  Array syncing vs. creating an object avoids potential
// property naming conflict,  best to keep naming to a minimum and from a centralized location.
const correspondingPolygonPathsArray = [
  saharaPaths,
  arabiaPaths,
  laurentideIceSheetPaths,
  iceAgeEurope2Paths,
];

// Capitalized function Name because the return array of Components will be a React Component
export const PolygonListArrayFN = (stateObject) => {
  return overlaysArray.map((item, index) => {
    if (stateObject[item] === false) return null;
    return (
      <PolygonComponent
        key={item}
        paths={correspondingPolygonPathsArray[index]}
        options={{ ...polygonOptions, ...(index <= 1 ? greenFill : iceFill) }}
      />
    );
  });
};

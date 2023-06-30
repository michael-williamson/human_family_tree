import { PolygonComponent } from "./PolygonComponent";

import {
  correspondingPolygonPathsObject,
  greenFillObject,
  whiteFillObject,
} from "../../../../HelperFunctions/General";
import { useOverlaysArrayContext } from "../../../../State/MapState/MapItemStateArrays/OverlaysArrayProvider";

export const PolygonListComponent = () => {
  const overlaysArray = useOverlaysArrayContext();
  // const handleClick = (item) => () =>
  //   infoWindowContextUpdater({
  //     type: OPEN_INFO_WINDOW,
  //     payload: {
  //       typeOfMarker: "overlays",
  //       item: overlaysArray.find((overlay) => overlay.name === item),
  //     },
  //   });

  return (
    <>
      {overlaysArray.map(item => {
        const name = item.name;

        const optionsObject = greenFillObject[name] || whiteFillObject[name];

        return (
          <PolygonComponent
            key={item.ID}
            paths={correspondingPolygonPathsObject[name]}
            options={optionsObject}
          />
        );
      })}
    </>
  );
};

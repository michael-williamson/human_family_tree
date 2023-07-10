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

  const greenFill: { [key: string]: any } = { ...greenFillObject };
  const whiteFill: { [key: string]: any } = { ...whiteFillObject };
  const correspondingPaths: { [key: string]: any } = {
    ...correspondingPolygonPathsObject,
  };

  return (
    <>
      {overlaysArray.map((item: any) => {
        const name = item.name;

        const optionsObject = greenFill[name] || whiteFill[name];

        return (
          <PolygonComponent
            key={item.ID}
            paths={correspondingPaths[name]}
            options={optionsObject}
          />
        );
      })}
    </>
  );
};

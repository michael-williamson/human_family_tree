import React from "react";
import { MarkerList } from "./MarkerList";
import { useEntryExitPointsArrayContext } from "../../MapStateComponents/MapPopulationStateContext";
import { ENTRY_EXIT_POINTS } from "../../../../ConstantVariableNames";
import { footPrintBlueIcon } from "../../../../Media/MapIcons";

export const ExitPointsMarkerList = ({ clickHandler }: any) => {
  const entryExitPointsArrayContext = useEntryExitPointsArrayContext();
  return (
    <MarkerList
      arr={entryExitPointsArrayContext}
      typeOfMarker={ENTRY_EXIT_POINTS}
      icon={{
        url: footPrintBlueIcon,
        scaledSize: new google.maps.Size(30, 30),
      }}
      propsObject={{}}
      clickHandler={clickHandler}
    />
  );
};

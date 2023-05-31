import { useState } from "react";
import { MarkerList } from "./MarkerList";
import { useEntryExitPointsArrayContext } from "../../MapStateComponents/MapPopulationStateContext";
import { ENTRY_EXIT_POINTS } from "../../../../ConstantVariableNames";
import { footPrintBlueIcon } from "../../../../Media/MapIcons";
import { clickHandlerFactory } from "../../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents/MarkerClickHandler";

export const ExitPointsMarkerList = ({ clickHandler }: any) => {
  const entryExitPointsArrayContext = useEntryExitPointsArrayContext();
  const [handlerState] = useState(
    clickHandlerFactory(
      clickHandler,
      entryExitPointsArrayContext,
      ENTRY_EXIT_POINTS
    )
  );
  return (
    <MarkerList
      arr={entryExitPointsArrayContext}
      typeOfMarker={ENTRY_EXIT_POINTS}
      icon={{
        url: footPrintBlueIcon,
        scaledSize: new google.maps.Size(30, 30),
      }}
      propsObject={{}}
      handlerState={handlerState}
    />
  );
};

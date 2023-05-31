import { MarkerList } from "./MarkerList";
import { useEventArrayContext } from "../../MapStateComponents/MapPopulationStateContext";
import { EVENTS } from "../../../../ConstantVariableNames";
import { volcanoIcon } from "../../../../Media/MapIcons";
import { useState } from "react";
import { clickHandlerFactory } from "../../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents/MarkerClickHandler";

export const EventMarkerList = ({ clickHandler }: any) => {
  const eventArrayContext = useEventArrayContext();
  const [handlerState] = useState(
    clickHandlerFactory(clickHandler, eventArrayContext, EVENTS)
  );
  return (
    <MarkerList
      arr={eventArrayContext}
      typeOfMarker={EVENTS}
      icon={{
        url: volcanoIcon,
        scaledSize: new google.maps.Size(30, 30),
      }}
      propsObject={{}}
      handlerState={handlerState}
    />
  );
};

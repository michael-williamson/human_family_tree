import { MarkerList } from "./MarkerList";
import { useEventArrayContext } from "../../MapStateComponents/MapPopulationStateContext";
import { EVENTS } from "../../../../ConstantVariableNames";
import { volcanoIcon } from "../../../../Media/MapIcons";

export const EventMarkerList = ({ clickHandler }: any) => {
  const eventArrayContext = useEventArrayContext();
  return (
    <MarkerList
      arr={eventArrayContext}
      typeOfMarker={EVENTS}
      icon={{
        url: volcanoIcon,
        scaledSize: new google.maps.Size(30, 30),
      }}
      propsObject={{}}
      clickHandler={clickHandler}
    />
  );
};

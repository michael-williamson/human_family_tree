import {
  useInfoWindowContextUpdater,
  useMarkerClickHandler,
} from "../../MapStateComponents/InfoWindowStateProvider";
import { OverlaysMarkerList } from "./OverlaysMarkerList";
import { EventMarkerList } from "./EventMarkerList";
import { ExitPointsMarkerList } from "./ExitPointsMarkerList";
import { SpeciesMarkerList } from "./SpeciesMarkerList";

export const MarkerListsContainer = () => {
  const infoWindowContextUpdater = useInfoWindowContextUpdater();
  const markerClickHandler = useMarkerClickHandler(infoWindowContextUpdater);
  return (
    <>
      <SpeciesMarkerList clickHandler={markerClickHandler} />
      <OverlaysMarkerList clickHandler={markerClickHandler} />
      <ExitPointsMarkerList clickHandler={markerClickHandler} />
      <EventMarkerList clickHandler={markerClickHandler} />
    </>
  );
};

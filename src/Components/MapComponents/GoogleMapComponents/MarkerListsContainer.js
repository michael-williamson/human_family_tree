import React, { useCallback } from "react";
import {
  useEntryExitPointsArrayContext,
  useEventArrayContext,
  useOverlayArrayContext,
  useSpecimensArrayContext,
} from "../MapStateComponents/MapPopulationStateContext";
import { useInfoWindowContextUpdater } from "../MapStateComponents/InfoWindowStateProvider";
import {
  ENTRY_EXIT_POINTS,
  EVENTS,
  OPEN_INFO_WINDOW,
  OVERLAYS,
  SPECIES,
} from "../../../ConstantVariableNames";
import { FieldContextHookComponent } from "../../HookComponents/FieldContextHookComponent";
import {
  footPrintBlueIcon,
  skullIcon,
  volcanoIcon,
} from "../../../Media/MapIcons";
import { MarkerList } from "./MarkerList";
import theme from "../../../theme";
import { useMapLegendContext } from "../MapStateComponents/MapLegendStateProvider";

export const MarkerListsContainer = () => {
  const specimensArrayContext = useSpecimensArrayContext();
  const eventArrayContext = useEventArrayContext();
  const overlayArrayContext = useOverlayArrayContext();
  const entryExitPointsArrayContext = useEntryExitPointsArrayContext();
  const infoWindowContextUpdater = useInfoWindowContextUpdater();
  const mapLegendContext = useMapLegendContext();
  const markerClickHandler = useCallback(
    ({ typeOfMarker, item }) => {
      infoWindowContextUpdater({
        type: OPEN_INFO_WINDOW,
        payload: { typeOfMarker, item },
      });
    },
    [infoWindowContextUpdater]
  );
  return (
    <>
      <FieldContextHookComponent
        arr={specimensArrayContext}
        typeOfMarker={SPECIES}
        // function used to highlight Markers corresponding with map key field being hovered on
        iconObject={{
          url: skullIcon,
          scaledSize: { width: 35, height: 35 },
        }}
        clickHandler={markerClickHandler}
      />
      <MarkerList
        arr={overlayArrayContext}
        typeOfMarker={OVERLAYS}
        labelObject={{
          color: theme.palette.primary.main,
          fontSize: "14px",
          fontWeight: "bold",
          className: "my-marker-labels",
          mapKeyValues: mapLegendContext[OVERLAYS],
        }}
        iconObject={{ path: window.google.maps.SymbolPath.CIRCLE, scale: 0 }}
        googleMarkerComponentProps={{
          zIndex: 2000,
        }}
        clickHandler={markerClickHandler}
      />
      <MarkerList
        arr={entryExitPointsArrayContext}
        typeOfMarker={ENTRY_EXIT_POINTS}
        iconObject={{
          url: footPrintBlueIcon,
          scaledSize: { width: 30, height: 30 },
        }}
        clickHandler={markerClickHandler}
      />
      <MarkerList
        arr={eventArrayContext}
        typeOfMarker={EVENTS}
        iconObject={{
          url: volcanoIcon,
          scaledSize: { width: 30, height: 30 },
        }}
        clickHandler={markerClickHandler}
      />
    </>
  );
};

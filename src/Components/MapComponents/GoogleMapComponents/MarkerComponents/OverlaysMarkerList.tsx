import { MarkerList } from "./MarkerList";
import { OVERLAYS } from "../../../../ConstantVariableNames";
import theme from "../../../../theme";
import { useOverlayArrayContext } from "../../MapStateComponents/MapPopulationStateContext";

export const OverlaysMarkerList = ({ clickHandler }: any) => {
  const overlayArrayContext = useOverlayArrayContext();
  return (
    <MarkerList
      arr={overlayArrayContext}
      typeOfMarker={OVERLAYS}
      propsObject={{
        label: {
          color: theme.palette.primary.main,
          fontSize: "14px",
          fontWeight: "bold",
          className: "my-marker-labels",
          text: "",
        },
      }}
      listOfChanges={["addLabelText"]}
      icon={{ path: window.google.maps.SymbolPath.CIRCLE, scale: 0 }}
      clickHandler={clickHandler}
    />
  );
};

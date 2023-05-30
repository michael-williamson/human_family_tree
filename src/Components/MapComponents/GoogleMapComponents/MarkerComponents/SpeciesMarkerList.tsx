import { MarkerList } from "./MarkerList";
import { useSpecimensArrayContext } from "../../MapStateComponents/MapPopulationStateContext";
import { SPECIES } from "../../../../ConstantVariableNames";
import { skullIcon } from "../../../../Media/MapIcons";
import { useMapLegendFieldContext } from "../../MapStateComponents/MapLegendStateProvider";

export const SpeciesMarkerList = ({ clickHandler }: any) => {
  const specimensArrayContext = useSpecimensArrayContext();
  const fieldContext = useMapLegendFieldContext();
  return (
    <MarkerList
      arr={specimensArrayContext}
      typeOfMarker={SPECIES}
      icon={{
        url: skullIcon,
        scaledSize: new google.maps.Size(30, 30),
      }}
      propsObject={{
        icon: { url: skullIcon, scaledSize: new google.maps.Size(100, 100) },
        animation: window.google.maps.Animation.BOUNCE,
      }}
      fieldContext={fieldContext}
      listOfChanges={["iconScale"]}
      clickHandler={clickHandler}
    />
  );
};

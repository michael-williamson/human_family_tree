import { MarkerList } from "./MarkerList";
import { SPECIES } from "../../../../ConstantVariableNames";
import { skullIcon } from "../../../../Media/MapIcons";
import { useMapLegendFieldContext } from "../../MapStateComponents/MapLegendStateProvider";
import { useState } from "react";
import { clickHandlerFactory } from "../../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents/MarkerClickHandler";
import { useSpecimensArrayContext } from "../../../../State/MapState/MapItemStateArrays/SpecimensArrayProvider";

export const SpeciesMarkerList = ({ clickHandler }: any) => {
  const specimensArrayContext = useSpecimensArrayContext();
  const fieldContext = useMapLegendFieldContext();
  const [handlerState] = useState(
    clickHandlerFactory(clickHandler, specimensArrayContext, SPECIES)
  );
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
      handlerState={handlerState}
    />
  );
};

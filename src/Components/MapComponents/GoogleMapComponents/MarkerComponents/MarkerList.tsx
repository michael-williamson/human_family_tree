import { Marker, MarkerProps } from "@react-google-maps/api";
import { propsFactory } from "../../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents/markerListControlFlow";
import { JsonDataObjectTypes } from "../../../../Types/jsonTypes";

export type MarkerPropsOmittedTypes = Omit<MarkerProps, "position">;

interface MarkerListProps extends MarkerPropsOmittedTypes {
  arr: Array<JsonDataObjectTypes>;
  additionalProps?: {};
  typeOfMarker: string;
  clickHandler?: any;
  handlerState?: any;
  fieldContext?: string | undefined;
  propsObject: MarkerPropsOmittedTypes;
  listOfChanges?: Array<string>;
}

export const MarkerList: React.FC<MarkerListProps> = ({
  arr = [],
  animation,
  icon,
  additionalProps,
  typeOfMarker,
  clickHandler,
  handlerState,
  fieldContext,
  propsObject,
  listOfChanges,
}) => {
  return (
    <>
      {arr.map((item: any) => {
        const { ID, gpsCoor, name, [typeOfMarker]: category } = item;
        let changesObject: MarkerPropsOmittedTypes = {};
        if (listOfChanges) {
          changesObject = propsFactory({
            listOfChanges,
            changesObject,
            propsObject,
            category,
            name,
            fieldContext,
          });
        }

        return (
          <Marker
            key={ID}
            position={gpsCoor}
            icon={icon}
            animation={animation}
            onClick={clickHandler ? clickHandler : handlerState[ID]}
            {...changesObject}
            {...additionalProps}
          />
        );
      })}
    </>
  );
};

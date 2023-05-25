import { Marker } from "@react-google-maps/api";
import { propsFactory } from "../../../../HelperFunctions/MapComponent/GoogleMapsComponent/MarkerComponents/markerListControlFlow";

interface MarkerListProps {
  arr: Array<{}>;
  animation: google.maps.Animation;
  labelObject: string | google.maps.MarkerLabel;
  iconObject: string | google.maps.Icon | google.maps.Symbol | undefined;
  updatedIconObject: {};
  additionalProps: {};
  typeOfMarker: string;
  clickHandler: Function;
  mapLegendFieldContext: string;
  iconEditable: boolean;
  controlFlowObject: {};
  propsObject: { icon: google.maps.Icon; label: google.maps.MarkerLabel };
  listOfChanges: Array<any> | undefined;
}

export const MarkerList: React.FC<MarkerListProps> = ({
  arr = [],
  animation,
  iconObject,
  additionalProps,
  typeOfMarker,
  clickHandler,
  mapLegendFieldContext: fieldContext,
  propsObject,
  listOfChanges,
}) => {
  return (
    <>
      {arr.map(({ ID, gpsCoor, name, [typeOfMarker]: category }: any) => {
        let changesObject = {};
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
            icon={iconObject}
            animation={animation}
            {...changesObject}
            {...additionalProps}
          />
        );
      })}
    </>
  );
};

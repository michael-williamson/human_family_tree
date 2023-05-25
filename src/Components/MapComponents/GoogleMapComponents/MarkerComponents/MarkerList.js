import { Marker } from "@react-google-maps/api";

export const MarkerList = ({
  arr = [],
  animation,
  labelObject,
  iconObject = {},
  additionalProps = {},
  typeOfMarker,
  showIcon = true,
  clickHandler,
  mapLegendFieldContext = null,
  highLighted = false,
  controlFlowObject = {},
}) => {
  return (
    <>
      {arr.map(({ ID, gpsCoor, name, [typeOfMarker]: category }) => {
        let label = labelObject;
        let controlFlow = {};
        if (highLighted && mapLegendFieldContext === category) {
          controlFlow = {
            icon: { ...iconObject, scaledSize: { height: 100, width: 100 } },
            animation: window.google.maps.Animation.BOUNCE,
          };
        }

        if (labelObject) {
          // label = { ...labelObject, text: name };
          controlFlow = { label: { ...labelObject, text: name } };
        }

        return (
          <Marker
            key={ID}
            position={gpsCoor}
            icon={iconObject}
            label={label}
            animation={animation}
            {...controlFlow}
            {...additionalProps}
          />
        );
      })}
    </>
  );
};

import { Children, memo, useRef } from "react";
import { createPortal } from "react-dom";
import { ReactChildrenProp } from "../../../../Types/GlobalTypes";

interface MapKeyControlType {
  children: ReactChildrenProp;
  mapInstance: any;
}

const HideMapKey = ({ children, mapInstance }: MapKeyControlType) => {
  const containerElementRef = useRef(document.createElement("div"));
  if (mapInstance === null || undefined) return null;

  mapInstance.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
    containerElementRef.current
  );
  return containerElementRef.current
    ? createPortal(Children.only(children), containerElementRef.current)
    : null;
};

export const HideMapKeyControl = memo(HideMapKey);

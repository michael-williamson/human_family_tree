import { Children, memo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ReactChildrenProp } from "../../../../Types/GlobalTypes";

interface MapKeyControlType {
  children: ReactChildrenProp;
  mapInstance: any;
}

const MapKey = ({ children, mapInstance }: MapKeyControlType) => {
  const containerElementRef = useRef(document.createElement("div"));

  useEffect(() => {
    mapInstance &&
      mapInstance.controls[
        window.google.maps.ControlPosition.RIGHT_CENTER
      ].push(containerElementRef.current);
  }, [mapInstance]);

  if (!mapInstance) return null;

  return containerElementRef.current
    ? createPortal(Children.only(children), containerElementRef.current)
    : null;
};

export const MapKeyControl = memo(MapKey);

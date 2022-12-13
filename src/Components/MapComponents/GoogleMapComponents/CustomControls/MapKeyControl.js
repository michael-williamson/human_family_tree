import { Children, memo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const MapKey = ({ children, mapInstance }) => {
  const containerElementRef = useRef(null);
  useEffect(() => {
    containerElementRef.current = document.createElement("div");
  }, []);

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

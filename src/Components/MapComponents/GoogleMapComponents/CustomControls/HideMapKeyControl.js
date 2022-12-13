import { Children, memo, useRef } from "react";
import { createPortal } from "react-dom";

const HideMapKey = ({ children, mapInstance }) => {
  const containerElementRef = useRef(null);
  if (mapInstance === null || undefined) return null;
  containerElementRef.current = document.createElement("div");
  mapInstance.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
    containerElementRef.current
  );
  return containerElementRef.current
    ? createPortal(Children.only(children), containerElementRef.current)
    : null;
};

export const HideMapKeyControl = memo(HideMapKey);

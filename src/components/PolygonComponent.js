import React from "react";
import { Polygon } from "@react-google-maps/api";

export const PolygonComponent = (props) => {
  const { paths, fillColor, editable, clickable, draggable, strokeWeight } =
    props;
  const options = {
    fillColor: fillColor,
    fillOpacity: 1,
    strokeColor: "green",
    strokeOpacity: 1,
    strokeWeight: strokeWeight || 0,
    clickable: clickable || false,
    draggable: draggable || false,
    editable: editable || false,
    geodesic: false,
    zIndex: 1,
  };

  return (
    <div>
      <Polygon paths={paths} options={options} />
    </div>
  );
};

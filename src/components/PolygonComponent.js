import React from "react";
import { Polygon } from "@react-google-maps/api";

export const PolygonComponent = (props) => {
  const { paths } = props;
  const options = {
    fillColor: "rgb(81 101 74 / 75%)",
    fillOpacity: 1,
    strokeColor: "green",
    strokeOpacity: 1,
    strokeWeight: 0,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };

  // const onLoad = (polygon) => {
  //   console.log("polygon: ", polygon);
  // };

  return (
    <div>
      <Polygon paths={paths} options={options} />
    </div>
  );
};

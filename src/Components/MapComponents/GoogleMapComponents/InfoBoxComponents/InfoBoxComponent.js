import React, { useState } from "react";
import { Box } from "@mui/system";

export const InfoBoxComponent = ({ infoBoxProps, children }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [visibility, setVisibility] = useState("visible");

  const xyObject = { x: null, y: null };
  const handleDragStart = (e) => {
    xyObject.x = e.clientX;
    xyObject.y = e.clientY;
  };
  const handleDragEnd = (e) => {
    let x = e.clientX - xyObject.x;
    let y = e.clientY - xyObject.y;

    setPosition((prev) => ({ ...{ x: prev.x + x, y: prev.y + y } }));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${position.x}px,${position.y}px)`,
        transformOrigin: "top left",
        width: "min-content",
        minWidth: 300,
        transition: "transform 200ms linear",
        background: "rgb(0 0 0 / 46%)",
        p: 1,
        resize: "both",
        overflow: "auto",
        visibility,
      }}
      id="graphDrag"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable="true"
    >
      <Box
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={(e) => setVisibility("hidden")}
      >
        X
      </Box>
      {children}
    </Box>
  );
};

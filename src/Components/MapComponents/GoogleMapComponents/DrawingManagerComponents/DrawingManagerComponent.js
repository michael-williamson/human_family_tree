import { Box } from "@mui/system";
import { DrawingManager } from "@react-google-maps/api";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  CardMedia,
  Checkbox,
  TextField,
} from "@mui/material";
import { RadioButtonChecked } from "@mui/icons-material";
import React, { useState, useRef } from "react";
import {
  drawingManagerContainerStyles,
  drawingManagerInputsContainerStyles,
  drawingManagerLabelStyles,
  drawingManagerTitleContainerStyles,
  drawingManagerTitleIconStyles,
  drawingManagerTitleStyles,
  radioGroupStyles,
  windowMoveIconContainer,
  windowMoveIconText,
} from "../../../../Styles/MapComponentStyles/DrawingManagerStyles";
import { drawingManagerIcon, windowMoveIcon } from "../../../../Media/MapIcons";
import { PLACE_PATH } from "../../../../Media/SvgIconPaths";

export const DrawingManagerComponent = () => {
  const [color, setColor] = useState("blue");
  const [lineWidth, setLineWidth] = useState(10);
  const [vectorsVisible, setVectorsVisible] = useState(true);
  const [markerColor, setMarkerColor] = useState("blue");
  const [markerLabel, setMarkerLabel] = useState("");
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [drawingManagerOptionsVisible, setDrawingManagerOptionsVisible] =
    useState(true);
  const drawingManagerInstance = useRef(null);
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
  const handleColorChange = (e) => setColor(e.target.value);
  const handleMarkerColorChange = (e) => setMarkerColor(e.target.value);
  const handleMarkerLabelChange = (e) => setMarkerLabel(e.target.value);
  const handleLineWidthChange = (e) => setLineWidth(e.target.value);
  const handleVectorsVisibleChange = (e) => {
    setVectorsVisible((prev) => !prev);
    drawingManagerInstance.current.setOptions({
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
      },
      polylineOptions: {
        strokeColor: color,
        editable: !e.target.value,
        strokeWeight: lineWidth,
      },
    });
  };
  const handleCloseDrawingManagerOptions = (e) =>
    setDrawingManagerOptionsVisible((prev) => !prev);

  function valuetext(value) {
    return `${value} Pixels`;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        mx: "auto",
        width: "fit-content",
      }}
    >
      <DrawingManager
        drawingControl={false}
        onLoad={(loadObject) => {
          console.log(loadObject, "load object");
          drawingManagerInstance.current = loadObject;
        }}
        options={{
          drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_CENTER,
          },
          markerOptions: {
            icon: {
              path: PLACE_PATH,
              strokeColor: markerColor,
              fillColor: markerColor,
              fillOpacity: 1,
              scale: 1,
              strokeWeight: 2,
            },
            label: {
              text: markerLabel,
            },
          },
          polylineOptions: {
            strokeColor: color,
            editable: vectorsVisible,
            strokeWeight: lineWidth,
          },
        }}
      />
      <Box
        sx={{
          ...drawingManagerContainerStyles,
          transform: `translate(${position.x}px,${position.y}px)`,
          visibility: drawingManagerOptionsVisible ? "visible" : "hidden",
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        draggable="true"
      >
        <Box sx={windowMoveIconContainer} className="windowMoveIcon">
          <CardMedia component="img" src={windowMoveIcon} sx={{ width: 40 }} />
          <Box>
            <Box sx={windowMoveIconText}>Click & Drag Window</Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "2px",
            right: "2px",
            mx: "auto",
            cursor: "pointer",
            width: "max-content",
            color: (theme) => theme.palette.primary.main,
          }}
          onClick={handleCloseDrawingManagerOptions}
        >
          [ to close ]
        </Box>
        <Box sx={drawingManagerTitleContainerStyles}>
          <Box sx={drawingManagerTitleStyles}>Drawing Manager Options</Box>
          <CardMedia
            component="img"
            src={drawingManagerIcon}
            sx={drawingManagerTitleIconStyles}
          />
        </Box>
        <Box sx={drawingManagerInputsContainerStyles}>
          <Box>
            <Box sx={drawingManagerLabelStyles}>Line Width:</Box>
            <Slider
              aria-label="Small steps"
              defaultValue={lineWidth}
              getAriaValueText={valuetext}
              onChange={handleLineWidthChange}
              step={5}
              marks
              min={5}
              max={40}
              valueLabelDisplay="auto"
            />
            <Box sx={drawingManagerLabelStyles}>{`${lineWidth} Pixels`}</Box>
          </Box>
          <FormControl>
            <FormLabel
              id="controlled-radio-buttons-group-polyline"
              sx={drawingManagerLabelStyles}
            >
              Line Color:{" "}
            </FormLabel>
            <RadioGroup
              aria-labelledby="controlled-radio-buttons-group-polyline"
              name="controlled-radio-buttons-group-polyline"
              value={color}
              onChange={handleColorChange}
              sx={{
                flexDirection: "row",
                fontSize: 30,
                fontWeight: "bold",
                ...radioGroupStyles,
              }}
            >
              <FormControlLabel
                value="blue"
                control={
                  <Radio
                    checkedIcon={<RadioButtonChecked sx={{ color: "blue" }} />}
                    sx={{ fontSize: 30, fontWeight: "bold", color: "blue" }}
                  />
                }
                label="Blue"
                sx={{ fontSize: 30, fontWeight: "bold", color: "blue" }}
              />
              <FormControlLabel
                value="green"
                control={
                  <Radio
                    checkedIcon={<RadioButtonChecked sx={{ color: "green" }} />}
                    sx={{ fontSize: 30, fontWeight: "bold", color: "green" }}
                  />
                }
                label="Green"
                sx={{ fontSize: 30, fontWeight: "bold", color: "green" }}
              />
            </RadioGroup>
          </FormControl>
          <Box>
            <FormControlLabel
              label={
                <Box sx={{ ...drawingManagerLabelStyles, pb: 1 }}>
                  Vectors Visible:
                </Box>
              }
              labelPlacement="top"
              value={vectorsVisible}
              checked={vectorsVisible}
              control={
                <Checkbox
                  color={"primary"}
                  onClick={handleVectorsVisibleChange}
                />
              }
            />
          </Box>
          <Box>
            <Box sx={drawingManagerLabelStyles}>Marker Options:</Box>
            <Box>
              <Box>Marker Label:</Box>
              <TextField
                label="Marker Label"
                helperText="add label here"
                value={markerLabel}
                onChange={handleMarkerLabelChange}
                color="primary"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    color: (theme) => theme.palette.customColors.beige,
                    borderColor: (theme) => theme.palette.customColors.beige,
                  },
                  ".MuiFormLabel-root": {
                    color: (theme) => theme.palette.customColors.beige,
                  },
                  ".MuiInputBase-root": {
                    color: "white",
                    borderColor: "white",
                  },
                  ".MuiOutlinedInput-root": {
                    color: "white",
                    borderColor: "white",
                  },
                }}
              />
            </Box>
            <FormControl>
              <FormLabel
                id="controlled-radio-buttons-group-markers"
                sx={{ color: "white", textAlign: "center" }}
              >
                Marker Color:{" "}
              </FormLabel>
              <RadioGroup
                aria-labelledby="controlled-radio-buttons-group-markers"
                name="controlled-radio-buttons-group-markers"
                value={markerColor}
                onChange={handleMarkerColorChange}
                sx={{
                  flexDirection: "row",
                  fontSize: 30,
                  fontWeight: "bold",
                  ...radioGroupStyles,
                }}
              >
                <FormControlLabel
                  value="blue"
                  control={
                    <Radio
                      checkedIcon={
                        <RadioButtonChecked sx={{ color: "blue" }} />
                      }
                      sx={{ fontSize: 30, fontWeight: "bold", color: "blue" }}
                    />
                  }
                  label="Blue"
                  sx={{ fontSize: 30, fontWeight: "bold", color: "blue" }}
                />
                <FormControlLabel
                  value="green"
                  control={
                    <Radio
                      checkedIcon={
                        <RadioButtonChecked sx={{ color: "green" }} />
                      }
                      sx={{ fontSize: 30, fontWeight: "bold", color: "green" }}
                    />
                  }
                  label="Green"
                  sx={{ fontSize: 30, fontWeight: "bold", color: "green" }}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

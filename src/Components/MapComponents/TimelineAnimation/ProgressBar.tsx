import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Slider } from "@mui/material";
import {
  useStartProgressContext,
  useStartProgressContextUpdater,
  useTimelineProgressContext,
} from "../../../State/MapState/MapTimelineAnimation/TimelineAnimationState";
import {
  generateTicks,
  marksArrayCreator,
} from "../../../HelperFunctions/MapComponent/GoogleMapsComponent/TimelineProgressComponents";

const boxStyles = {
  position: "relative",
  width: "50%",
  background: "white",
  zIndex: "1000",
  padding: "80px",
};

const styles = {
  position: "relative",

  background: "#ffffff",
  height: "100px",
};

const marks2 = marksArrayCreator();
console.log("marks2: ", marks2);

const marks = [
  {
    value: 0,
    label: "2 MYA",
  },
  {
    value: 23,
    label: "500 TYA",
  },
  {
    value: 44,
    label: "200 TYA",
  },

  {
    value: 72,
    label: "100 TYA",
  },
  // {
  //   value: 79,
  //   label: "75 TYA",
  // },
  {
    value: 88,
    label: "50 TYA",
  },
  {
    value: 95,
    label: "25 TYA",
  },
  {
    value: 100,
    label: "present",
  },
];

interface SlotElementType extends React.HTMLAttributes<unknown> {}

const SlotElement = ({ children, ...other }: SlotElementType) => {
  return (
    <Box
      sx={{
        color: "blue",
        position: "absolute",

        top: "30px",
        fontWeight: "bold",
      }}
      component="span"
      {...other}
    >
      {children}
    </Box>
  );
};

export const ProgressBar = () => {
  const progress = useTimelineProgressContext();
  const startProgress = useStartProgressContext();
  const setStartProgress = useStartProgressContextUpdater();
  const handler = (e: any) => {
    setStartProgress(prev => !prev);
  };
  return (
    <Box sx={boxStyles}>
      <Box sx={styles}>
        <Slider
          value={progress}
          valueLabelDisplay="auto"
          marks={marks}
          step={1}
          slots={{
            // mark: SlotElement,
            markLabel: SlotElement,
          }}
        />
        <Button onClick={handler}>{startProgress ? "Pause" : "Start"}</Button>
      </Box>
    </Box>
  );
};

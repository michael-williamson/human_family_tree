import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Slider } from "@mui/material";
import {
  useStartProgressContext,
  useStartProgressContextUpdater,
  useTimelineProgressContext,
} from "../../../State/MapState/MapTimelineAnimation/TimelineAnimationState";
import { Container } from "../../ReusableComponents/Container";
import {
  animationContainerStyles,
  progressBarStyles,
  slotElementStyles,
  startButtonStyles,
} from "../../../Styles/MapComponentStyles/TimelineAnimationStyles/timelineAnimationContainer";

const marks = [
  {
    value: 0,
    label: "2 MYA",
  },
  {
    value: 25,
    label: "500 TYA",
  },
  {
    value: 50,
    label: "200 TYA",
  },

  // {
  //   value: 95,
  //   label: "100 TYA",
  // },
  // {
  //   value: 79,
  //   label: "75 TYA",
  // },
  // {
  //   value: 88,
  //   label: "50 TYA",
  // },
  // {
  //   value: 95,
  //   label: "25 TYA",
  // },
  {
    value: 100,
    label: "present",
  },
];

interface SlotElementType extends React.HTMLAttributes<unknown> {}

const SlotElement = ({ children, ...other }: SlotElementType) => {
  return (
    <Box sx={slotElementStyles} component="span" {...other}>
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
    <Container containerStyles={animationContainerStyles}>
      <Container containerStyles={progressBarStyles}>
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
        <Button onClick={handler} sx={startButtonStyles}>
          {startProgress ? "Pause" : "Start"}
        </Button>
      </Container>
    </Container>
  );
};

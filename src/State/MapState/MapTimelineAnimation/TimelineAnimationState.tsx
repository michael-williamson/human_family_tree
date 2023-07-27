import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { datesArr } from "../../../HelperFunctions/General";
import {
  useSpecimensArrayContextUpdater,
  useSpecimensByDate,
} from "../MapItemStateArrays/SpecimensArrayProvider";
import { datesPropertyComparison } from "../../../HelperFunctions/State/TimelineAnimationState";
import { ADD, DESELECT_ALL } from "../../../ConstantVariableNames";

const TimelineProgressContext = React.createContext(0);
const StartProgressContext = React.createContext(false);
const StartProgressContextUpdater = React.createContext(
  {} as Dispatch<SetStateAction<boolean>>
);

export const useTimelineProgressContext = () => {
  return useContext(TimelineProgressContext);
};

export const useStartProgressContext = () => {
  return useContext(StartProgressContext);
};

export const useStartProgressContextUpdater = () => {
  return useContext(StartProgressContextUpdater);
};
const total = 2000000;
const onePercent = total / 100;
let currentRate = 20000;

const datesArrayClone = [...datesArr];
datesArrayClone.shift();

export const TimelineAnimationState = ({
  children,
}: React.HTMLAttributes<unknown>) => {
  const [progress, setProgress] = React.useState(0);
  const [startProgress, setStartProgress] = useState(false);
  const [currentYear, setCurrentYear] = useState(total);
  const specimensByDate = useSpecimensByDate();
  const specimensArrayUpdater = useSpecimensArrayContextUpdater();

  useEffect(() => {
    if (!startProgress) {
      return;
    }
    const action = {
      type: DESELECT_ALL,
      category: "Timeline Animation",
      fieldName: "",
      singleItem: [],
    };
    specimensArrayUpdater(action);

    const timer = setInterval(() => {
      setProgress(oldProgress => oldProgress + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startProgress, specimensByDate, specimensArrayUpdater]);

  useEffect(() => {
    const calculateRemaining = (progress: number, currentYear: number) => {
      const remaining = 100 - progress;
      let diff = total - currentYear;
      let realDiff = total - diff;
      return realDiff / remaining;
    };

    const calculateRate = (amountProgress: number, amountYears: number) => {
      return amountYears / amountProgress;
    };

    const rateCalculator = (rateMessage: string, oldCurrentYear: number) => {
      switch (rateMessage) {
        case "FOUR_TIMES":
          return calculateRate(25, 1500000);
        case "TWO_TIMES":
          return calculateRate(25, 300000);
        case "REMAINING":
          return calculateRemaining(progress, oldCurrentYear);
        default:
          return onePercent;
      }
    };

    setCurrentYear(oldCurrentYear => {
      const progressValueObj: { [key: string]: string } = {
        "1": "FOUR_TIMES",
        "25": "TWO_TIMES",
        "50": "REMAINING",
      };
      const progressStr = progress.toString();

      if (progressValueObj[progressStr]) {
        const yearDiff = rateCalculator(
          progressValueObj[progressStr],
          oldCurrentYear
        );
        currentRate = yearDiff;
        return oldCurrentYear - yearDiff;
      } else {
        return oldCurrentYear - currentRate;
      }
    });

    return () => {};
  }, [progress]);

  useEffect(() => {
    if (!startProgress) {
      return;
    }
    if (currentYear <= 0) {
      return setStartProgress(false);
    }
    const data = datesPropertyComparison(
      datesArrayClone,
      currentYear,
      specimensByDate
    );
    if (data.length) {
      const action = {
        type: ADD,
        category: "Timeline Animation",
        fieldName: "",
        singleItem: data,
      };
      specimensArrayUpdater(action);
    }

    return () => {};
  }, [
    specimensArrayUpdater,
    specimensByDate,
    setStartProgress,
    currentYear,
    startProgress,
  ]);

  return (
    <TimelineProgressContext.Provider value={progress}>
      <StartProgressContext.Provider value={startProgress}>
        <StartProgressContextUpdater.Provider value={setStartProgress}>
          <div>{children}</div>
        </StartProgressContextUpdater.Provider>
      </StartProgressContext.Provider>
    </TimelineProgressContext.Provider>
  );
};

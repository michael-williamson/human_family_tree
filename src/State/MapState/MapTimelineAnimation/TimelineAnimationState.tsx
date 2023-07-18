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
let currentYear = 2000000;
const yearsPerPercent = 2000000 / 100;

const datesArrayClone = [...datesArr];
datesArrayClone.shift();

export const TimelineAnimationState = ({
  children,
}: React.HTMLAttributes<unknown>) => {
  const [progress, setProgress] = React.useState(0);
  const [startProgress, setStartProgress] = useState(false);
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
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          setStartProgress(false);
          return 0;
        }
        // return Math.min(oldProgress + 1, 100);
        let diff;
        if (oldProgress >= 44) {
          diff = Math.random() * 1.6;
        } else if (oldProgress >= 23) {
          diff = Math.random() * 4.8;
        } else {
          diff = Math.random() * 4.4;
        }
        return Math.min(oldProgress + diff, 100);
      });
    }, 1200);

    return () => {
      clearInterval(timer);
    };
  }, [startProgress, specimensByDate, specimensArrayUpdater]);

  useEffect(() => {
    if (!startProgress) {
      return;
    }

    const diff = Math.floor(progress * yearsPerPercent);
    console.log("diff: ", diff);
    currentYear = Math.floor(total - diff);
    console.log("currentYear: ", currentYear);

    if (currentYear <= 0) {
      return;
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
  }, [specimensArrayUpdater, specimensByDate, progress, startProgress]);

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

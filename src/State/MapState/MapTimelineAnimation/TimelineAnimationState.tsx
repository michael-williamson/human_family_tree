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

let currentYear = 2000000;
const yearsPerPercent = 2000000 / 100;

export const TimelineAnimationState = ({
  children,
}: React.HTMLAttributes<unknown>) => {
  const [progress, setProgress] = React.useState(0);
  const [startProgress, setStartProgress] = useState(false);
  const specimensByDate = useSpecimensByDate();
  const specimensArrayUpdater = useSpecimensArrayContextUpdater();
  //   const setStartProgressHandler = useCallback((e:any) => {
  //     setStartProgress(prev => !prev);
  //   }, [setStartProgress]);

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

    const datesArrayClone = [...datesArr];
    const specimensByDateClone = { ...specimensByDate };
    datesArrayClone.shift();
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          setStartProgress(false);
          return 0;
        }
        currentYear = currentYear - yearsPerPercent;

        const data = datesPropertyComparison(
          datesArrayClone,
          currentYear,
          specimensByDateClone
        );
        if (data) {
          const action = {
            type: ADD,
            category: "Timeline Animation",
            fieldName: "",
            singleItem: data,
          };
          specimensArrayUpdater(action);
        }

        return Math.min(oldProgress + 1, 100);
      });
    }, 1200);

    return () => {
      clearInterval(timer);
    };
  }, [startProgress, specimensByDate, specimensArrayUpdater]);
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

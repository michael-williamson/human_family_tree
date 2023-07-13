import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

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

export const TimelineAnimationState = ({
  children,
}: React.HTMLAttributes<unknown>) => {
  const [progress, setProgress] = React.useState(0);
  const [startProgress, setStartProgress] = useState(false);
  //   const setStartProgressHandler = useCallback((e:any) => {
  //     setStartProgress(prev => !prev);
  //   }, [setStartProgress]);

  useEffect(() => {
    if (!startProgress) {
      return;
    }

    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          setStartProgress(false);
          return 0;
        }

        return Math.min(oldProgress + 1, 100);
      });
    }, 1200);

    return () => {
      clearInterval(timer);
    };
  }, [startProgress]);
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

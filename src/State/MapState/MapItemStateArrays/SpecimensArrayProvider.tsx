import React, {
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  addSpeciesCategory,
  arrayReducer,
  filterBySpecies,
} from "../../../HelperFunctions/State/MapItemStateArrays";
import {
  httpRequest,
  httpRequestParamHandler,
} from "../../../HTTP/httpRequests";
import { ActionType } from "../../../Types/StateTypes";
import {
  ADD,
  DATES,
  SELECT_ALL,
  SPECIES,
} from "../../../ConstantVariableNames";
import { useSpeciesCountUpdater } from "../MapItemCountState/SpeciesCountProvider";
import { useDatesCountUpdater } from "../MapItemCountState/DatesCountProvider";

const SpecimensArrayContext = React.createContext([] as any);
const SpecimensArrayContextUpdater = React.createContext({} as Dispatch<any>);

export const useSpecimensArrayContext = () => {
  return useContext(SpecimensArrayContext);
};

export const useSpecimensArrayContextUpdater = () => {
  return useContext(SpecimensArrayContextUpdater);
};

export const SpecimensArrayProvider = ({ children }: any) => {
  const [specimensArray, specimensArrayDispatch] = useReducer(arrayReducer, []);
  const setSpeciesCount = useSpeciesCountUpdater();
  const setDatesCount = useDatesCountUpdater();
  const arrayUpdater = useCallback(
    async ({ type, category, fieldName, checkboxState, count }: ActionType) => {
      const setCountState =
        category === SPECIES ? setSpeciesCount : setDatesCount;
      if (type === ADD) {
        const url = httpRequestParamHandler({ type, category, fieldName });
        const data = await httpRequest(url);

        return specimensArrayDispatch({
          type,
          data,
          fieldName,
          checkboxState,
          category,
          count,
          setCountState,
          reducerFN: addSpeciesCategory,
        });
      }

      return specimensArrayDispatch({
        type,
        data: [],
        fieldName,
        category,
        count,
        setCountState,
        reducerFN: filterBySpecies,
      });
    },
    [specimensArrayDispatch, setSpeciesCount, setDatesCount]
  );

  useEffect(() => {
    const action = {
      type: SELECT_ALL,
      category: SPECIES,
      fieldName: "",
    };
    const requestFN = async () => {
      const url = httpRequestParamHandler(action);
      const data = await httpRequest(url);
      const quickCounter = (data: any, propName: string, stateUpdate: any) => {
        let obj: any = {};
        data.forEach((item: any) => {
          const speciesProp = item[propName];
          if (obj[speciesProp]) return obj[speciesProp]++;
          obj[speciesProp] = 1;
          return;
        });
        stateUpdate(obj);
      };
      quickCounter(data, SPECIES, setSpeciesCount);
      quickCounter(data, DATES, setDatesCount);
      specimensArrayDispatch({ type: SELECT_ALL, data });
    };

    requestFN();

    return () => {};
  }, [setSpeciesCount, setDatesCount]);

  return (
    <SpecimensArrayContext.Provider value={specimensArray}>
      <SpecimensArrayContextUpdater.Provider value={arrayUpdater}>
        {children}
      </SpecimensArrayContextUpdater.Provider>
    </SpecimensArrayContext.Provider>
  );
};

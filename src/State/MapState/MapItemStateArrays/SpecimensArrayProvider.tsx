import React, {
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  addSingleSpecimen,
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
  DESELECT_ALL,
  SELECT_ALL,
  SPECIES,
  SPECIMENS_BY_DATE,
  SPECIMENS_BY_SPECIES,
} from "../../../ConstantVariableNames";
import { useSpeciesCountUpdater } from "../MapItemCountState/SpeciesCountProvider";
import { useDatesCountUpdater } from "../MapItemCountState/DatesCountProvider";

const SpecimensArrayContext = React.createContext([] as any);
const SpecimensArrayContextUpdater = React.createContext({} as Dispatch<any>);

const SpecimensBySpecies = React.createContext({} as any);
const SpecimensByDate = React.createContext({} as any);

const FullSpecimensArray = React.createContext({} as any);

export const useSpecimensArrayContext = () => {
  return useContext(SpecimensArrayContext);
};

export const useSpecimensArrayContextUpdater = () => {
  return useContext(SpecimensArrayContextUpdater);
};

export const useSpecimensBySpecies = () => {
  return useContext(SpecimensBySpecies);
};

export const useSpecimensByDate = () => {
  return useContext(SpecimensByDate);
};

export const useFullSpecimensArray = () => {
  return useContext(FullSpecimensArray);
};

export const SpecimensArrayProvider = ({ children }: any) => {
  const [specimensArray, specimensArrayDispatch] = useReducer(arrayReducer, []);
  const [specimensBySpecies, setSpecimensBySpecies] = useState({});
  const [specimensByDate, setSpecimensByDate] = useState({});
  const [fullSpecimensArray, setFullSpecimensArray] = useState([]);
  const setSpeciesCount = useSpeciesCountUpdater();
  const setDatesCount = useDatesCountUpdater();
  const arrayUpdater = useCallback(
    async ({
      type,
      category,
      fieldName,
      checkboxState,
      count,
      singleItem,
    }: ActionType) => {
      console.log(type, "type");
      const setCountState =
        category === SPECIES ? setSpeciesCount : setDatesCount;
      if (type === DESELECT_ALL) {
        return specimensArrayDispatch({
          type,
        });
      }
      if (type === ADD) {
        if (category === "Timeline Animation") {
          return specimensArrayDispatch({
            type,
            data: singleItem,
            fieldName,
            checkboxState,
            category,
            count,
            setCountState,
            reducerFN: addSingleSpecimen,
          });
        }
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
      setFullSpecimensArray(data);
    };

    requestFN();

    return () => {};
  }, [setSpeciesCount, setDatesCount, setFullSpecimensArray]);

  useEffect(() => {
    const action = {
      type: SELECT_ALL,
      category: SPECIMENS_BY_SPECIES,
      fieldName: "",
    };
    const requestFN = async () => {
      const url = httpRequestParamHandler(action);
      const data = await httpRequest(url);

      setSpecimensBySpecies(data);
    };
    requestFN();
    return () => {};
  }, []);

  useEffect(() => {
    const action = {
      type: SELECT_ALL,
      category: SPECIMENS_BY_DATE,
      fieldName: "",
    };
    const requestFN = async () => {
      const url = httpRequestParamHandler(action);
      const data = await httpRequest(url);

      setSpecimensByDate(data);
    };
    requestFN();
    return () => {};
  }, []);

  return (
    <SpecimensArrayContext.Provider value={specimensArray}>
      <SpecimensArrayContextUpdater.Provider value={arrayUpdater}>
        <SpecimensBySpecies.Provider value={specimensBySpecies}>
          <SpecimensByDate.Provider value={specimensByDate}>
            <FullSpecimensArray.Provider value={fullSpecimensArray}>
              {children}
            </FullSpecimensArray.Provider>
          </SpecimensByDate.Provider>
        </SpecimensBySpecies.Provider>
      </SpecimensArrayContextUpdater.Provider>
    </SpecimensArrayContext.Provider>
  );
};

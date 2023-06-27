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
import { ADD, SELECT_ALL, SPECIES } from "../../../ConstantVariableNames";

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
  const arrayUpdater = useCallback(
    async ({ type, category, fieldName, checkboxState }: ActionType) => {
      if (type === ADD) {
        const url = httpRequestParamHandler({ type, category, fieldName });
        const data = await httpRequest(url);
        return specimensArrayDispatch({
          type,
          data,
          fieldName,
          checkboxState,
          reducerFN: addSpeciesCategory,
        });
      }

      return specimensArrayDispatch({
        type,
        data: [],
        fieldName,
        category,
        reducerFN: filterBySpecies,
      });
    },
    [specimensArrayDispatch]
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
      specimensArrayDispatch({ type: SELECT_ALL, data });
    };

    requestFN();

    return () => {};
  }, []);

  return (
    <SpecimensArrayContext.Provider value={specimensArray}>
      <SpecimensArrayContextUpdater.Provider value={arrayUpdater}>
        {children}
      </SpecimensArrayContextUpdater.Provider>
    </SpecimensArrayContext.Provider>
  );
};

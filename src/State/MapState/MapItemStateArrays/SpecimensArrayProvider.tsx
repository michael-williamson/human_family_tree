import React, { Dispatch, useCallback, useContext, useReducer } from "react";
import { arrayReducer } from "../../../HelperFunctions/State/MapItemStateArrays";
import {
  httpRequest,
  httpRequestParamHandler,
} from "../../../HTTP/httpRequests";
import { ActionType } from "../../../Types/StateTypes";
import { ADD } from "../../../ConstantVariableNames";

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
    async ({ type, category, fieldName }: ActionType) => {
      if (type === ADD) {
        const url = httpRequestParamHandler({ type, category, fieldName });
        const data = await httpRequest(url);
        console.log("data: ", data);
        specimensArrayDispatch({ type, data, fieldName });
      }

      specimensArrayDispatch({ type, data: [], fieldName });
    },
    [specimensArrayDispatch]
  );

  return (
    <SpecimensArrayContext.Provider value={specimensArray}>
      <SpecimensArrayContextUpdater.Provider value={arrayUpdater}>
        {children}
      </SpecimensArrayContextUpdater.Provider>
    </SpecimensArrayContext.Provider>
  );
};

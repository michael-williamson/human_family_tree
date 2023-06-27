import React, {
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import {
  addSingleOverlay,
  arrayReducer,
  filterByName,
} from "../../../HelperFunctions/State/MapItemStateArrays";
import { ActionType } from "../../../Types/StateTypes";
import {
  httpRequest,
  httpRequestParamHandler,
} from "../../../HTTP/httpRequests";
import { ADD, OVERLAYS, SELECT_ALL } from "../../../ConstantVariableNames";

const OverlaysArrayContext = React.createContext([] as any);
const OverlaysArrayContextUpdater = React.createContext({} as Dispatch<any>);

export const useOverlaysArrayContext = () => {
  return useContext(OverlaysArrayContext);
};

export const useOverlaysArrayContextUpdater = () => {
  return useContext(OverlaysArrayContextUpdater);
};

export const OverlaysArrayProvider = ({ children }: any) => {
  const [overlaysArray, overlaysArrayDispatch] = useReducer(arrayReducer, []);
  const overlaysArrayInstance = useRef<any>([]);
  const arrayUpdater = useCallback(
    ({ type, category, fieldName }: ActionType) => {
      if (type === ADD) {
        return overlaysArrayDispatch({
          type,
          data: overlaysArrayInstance.current,
          fieldName,
          addFN: addSingleOverlay,
        });
      }

      return overlaysArrayDispatch({
        type,
        data: [],
        fieldName,
        filterFN: filterByName,
      });
    },
    [overlaysArrayDispatch]
  );

  useEffect(() => {
    const action = {
      type: SELECT_ALL,
      category: OVERLAYS,
      fieldName: "",
    };
    const requestFN = async () => {
      const url = httpRequestParamHandler(action);
      const data = await httpRequest(url);
      overlaysArrayInstance.current = [...data];
      overlaysArrayDispatch({ type: SELECT_ALL, data });
    };

    requestFN();

    return () => {};
  }, []);
  return (
    <OverlaysArrayContext.Provider value={overlaysArray}>
      <OverlaysArrayContextUpdater.Provider value={arrayUpdater}>
        {children}
      </OverlaysArrayContextUpdater.Provider>
    </OverlaysArrayContext.Provider>
  );
};

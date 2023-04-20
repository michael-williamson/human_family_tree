import React, { useContext, useEffect, useRef, useCallback } from "react";
import axios from "axios";

import {
  ENTRY_EXIT_POINTS,
  EVENTS,
  LOCAL_SERVER_BASE_URL,
  OVERLAYS,
  REMOTE_SERVER_BASE_URL,
  SELECT_ALL,
  SPECIES,
} from "../../../ConstantVariableNames";
import { action } from "../../../HelperFunctions/MapComponent/MapStateComponents";
import { useArrayDispatchContext } from "./MapPopulationStateContext";

const NetworkRequestDispatch = React.createContext();

export const useNetworkRequestDispatch = () => {
  return useContext(NetworkRequestDispatch);
};

export const HTTPRequestStateProvider = ({ children }) => {
  const axiosRef = useRef(null);
  const arrayDispatchContext = useArrayDispatchContext();
  const fetchArray = useCallback(
    async ({ message, propertyName, fieldName, mapLegendState }) => {
      // action function found in helperfunctions folder
      const url = action({ message, propertyName, fieldName });
      // to update the specimens array with http requests we need to first make the request
      // --> then call the reducer / dispatch function within the context of the Promise to
      // --> capture the returned data & relay it to the context of the Specimens Array Context Provider
      // -->
      const { status, data } = await axiosRef.current.get(url);
      if (status === 200 && Array.isArray(data)) {
        const arr = [...data];
        arrayDispatchContext({ message, propertyName, arr, mapLegendState });
      }
    },
    [arrayDispatchContext]
  );

  const baseURL =
    process.env.NODE_ENV === "production"
      ? REMOTE_SERVER_BASE_URL
      : LOCAL_SERVER_BASE_URL;

  axiosRef.current = axios.create({
    baseURL,
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });

  useEffect(() => {
    fetchArray({
      message: SELECT_ALL,
      propertyName: SPECIES,
    });
    fetchArray({
      message: SELECT_ALL,
      propertyName: EVENTS,
    });
    fetchArray({
      message: SELECT_ALL,
      propertyName: OVERLAYS,
    });
    fetchArray({
      message: SELECT_ALL,
      propertyName: ENTRY_EXIT_POINTS,
    });

    return () => {};
  }, [fetchArray]);

  return (
    <NetworkRequestDispatch.Provider value={fetchArray}>
      {children}
    </NetworkRequestDispatch.Provider>
  );
};

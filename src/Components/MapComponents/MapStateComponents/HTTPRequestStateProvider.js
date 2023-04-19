import React, { useReducer, useContext, useEffect, useRef } from "react";
import axios from "axios";

import {
  ADD,
  DESELECT_ALL,
  ENTRY_EXIT_POINTS,
  EVENTS,
  LOCAL_SERVER_BASE_URL,
  OVERLAYS,
  REMOTE_SERVER_BASE_URL,
  SELECT_ALL,
  SPECIES,
  SUBTRACT,
} from "../../../ConstantVariableNames";
import { action } from "../../../HelperFunctions/MapComponent/MapStateComponents";
import { useArrayDispatchContext } from "./MapPopulationStateContext";

const SpecimensArrayContext = React.createContext();
const SpecimensArrayDispatch = React.createContext();
const NetworkRequestDispatch = React.createContext();

export const useSpecimensArrayContext = () => {
  return useContext(SpecimensArrayContext);
};

export const useSpecimensArrayDispatch = () => {
  return useContext(SpecimensArrayDispatch);
};

export const useNetworkRequestDispatch = () => {
  return useContext(NetworkRequestDispatch);
};

const stateReducer = (state, { message, payload: { arr } }) => {
  switch (message) {
    case SELECT_ALL:
      return [...arr];
    case DESELECT_ALL:
      return [];
    case ADD:
      return [];
    case SUBTRACT:
      return [];
    default:
      break;
  }
};

export const HTTPRequestStateProvider = ({ children }) => {
  const [specimensArray, arrayDispatch] = useReducer(stateReducer, []);
  const axiosRef = useRef(null);
  const arrayDispatchContext = useArrayDispatchContext();

  useEffect(() => {
    console.log("Specimens Array Provider first render");
    const baseURL =
      process.env.NODE_ENV === "production"
        ? REMOTE_SERVER_BASE_URL
        : LOCAL_SERVER_BASE_URL;
    axiosRef.current = axios.create({
      baseURL,
      timeout: 1000,
      headers: { "X-Custom-Header": "foobar" },
    });
    fetchArray({
      message: SELECT_ALL,
      propertyName: SPECIES,
    });
    // fetchArray({
    //   message: SELECT_ALL,
    //   propertyName: SPECIMENS_BY_DATE,
    // });
    // fetchArray({
    //   message: SELECT_ALL,
    //   propertyName: SPECIMENS_BY_SPECIES,
    // });
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
  }, []);

  const fetchArray = ({ message, propertyName, fieldName, mapLegendState }) => {
    // action function found in helperfunctions folder
    const url = action({ message, propertyName, fieldName });
    // to update the specimens array with http requests we need to first make the request
    // --> then call the reducer / dispatch function within the context of the Promise to
    // --> capture the returned data & relay it to the context of the Specimens Array Context Provider
    // -->
    (async function () {
      const { status, data } = await axiosRef.current.get(url);
      if (status === 200 && Array.isArray(data)) {
        const arr = [...data];
        arrayDispatchContext({ message, propertyName, arr, mapLegendState });
      }
    })();
  };

  return (
    <NetworkRequestDispatch.Provider value={fetchArray}>
      <SpecimensArrayContext.Provider value={specimensArray}>
        <SpecimensArrayDispatch.Provider value={arrayDispatch}>
          {children}
        </SpecimensArrayDispatch.Provider>
      </SpecimensArrayContext.Provider>
    </NetworkRequestDispatch.Provider>
  );
};

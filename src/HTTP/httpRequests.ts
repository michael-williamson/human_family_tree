import axios from "axios";
import {  
    DATES,
    ENTRY_EXIT_POINTS,
    ENTRY_EXIT_POINTS_ARRAY,
    EVENTS,
    EVENT_ARRAY,
    LOCAL_SERVER_BASE_URL,
    OVERLAYS,
    OVERLAY_ARRAY,
    REMOTE_SERVER_BASE_URL,
    SPECIES,
    SPECIMENS_BY_DATE,
    SPECIMENS_BY_ID,
    SPECIMENS_BY_SPECIES, } from "../ConstantVariableNames";
import { ActionType } from "../Types/StateTypes";

const baseURL =
process.env.NODE_ENV === "production"
  ? REMOTE_SERVER_BASE_URL
  : LOCAL_SERVER_BASE_URL;

const axiosInstance = axios.create({
    baseURL,
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });

  const matchingKeyValues:{[index: string]:string} = {
    [DATES]: SPECIMENS_BY_DATE,
    [SPECIES]: SPECIMENS_BY_SPECIES,
    [EVENTS]: EVENT_ARRAY,
    [OVERLAYS]: OVERLAY_ARRAY,
    [ENTRY_EXIT_POINTS]: ENTRY_EXIT_POINTS_ARRAY,
  };
  
  const apiAddressesObject :{[index: string]:string}= {
    [SPECIES]: "api/specimensArray",
    [SPECIMENS_BY_DATE]: "api/specimensByDate",
    [SPECIMENS_BY_SPECIES]: "api/specimensBySpecies",
    [SPECIMENS_BY_ID]: "api/specimensById",
    [EVENTS]: "api/events",
    [OVERLAYS]: "api/overlays",
    [ENTRY_EXIT_POINTS]: "api/entryExitPoints",
  };
  
  export const devApiAddressesObject:{[index: string]:string} = {
    [SPECIMENS_BY_SPECIES]: "http://localhost:5000/api/specimensBySpecies",
    [SPECIMENS_BY_DATE]: "http://localhost:5000/api/specimensByDate",
  };
  
  export const selectAllAddressesObject = {
    [SPECIES]: "http://localhost:5000/api/specimensArray",
    [SPECIMENS_BY_DATE]: "http://localhost:5000/api/specimensByDate",
    [SPECIMENS_BY_SPECIES]: "http://localhost:5000/api/specimensBySpecies",
    [EVENTS]: "http://localhost:5000/api/events",
    [OVERLAYS]: "http://localhost:5000/api/overlays",
    [ENTRY_EXIT_POINTS]: "http://localhost:5000/api/entryExitPoints",
  };

    console.log("axios instance created")

    export const httpRequestParamHandler = ({ category, fieldName,type }:ActionType) => {
      const propName = matchingKeyValues[category];
      if (fieldName) {
        const urlString = devApiAddressesObject[propName];
        return `${urlString}/${fieldName}`;
      }
    
      return apiAddressesObject[category];
    };

  export const httpRequest = async (url:string) => {
    const {status,data} = await axiosInstance.get(url);
    if (status === 200 ) {
        return data;
      } 


  }
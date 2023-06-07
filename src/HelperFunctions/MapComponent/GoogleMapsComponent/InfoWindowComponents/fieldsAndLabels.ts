import {
    CITY,
    CONTINENT,
    COUNTRY,
    DATE,

  } from "../../../../ConstantVariableNames";

const generalPropertiesObj = {
    Location: CITY,
    Country: COUNTRY,
    Continent: CONTINENT,
  };

  const dateObj = {
    Date: DATE,
  };



  export const typeOfMarkersObject : {[key: string]:any} = {
    species: {
      Species: "species",
      ...dateObj,
      ...generalPropertiesObj,
    },
    entryExitPoints: {
      "Point of Interest": "poiType",
      Description: "description",
    },
    events: {
      Description: "description",
      ...generalPropertiesObj,
      ...dateObj,
    },
    overlays: {
      Description: "description",
    },
  };

interface FieldTextFNTypes {
    sourceObject:any;
    labelObject:any;
    itemText:string;
}

export const fieldTextFN = ({sourceObject,labelObject,itemText}:FieldTextFNTypes):string => {
    if(sourceObject){
        return sourceObject[labelObject[itemText]]
    }
    return labelObject[itemText]
}

export const labelFN = (itemText:string):string => {
    return `${itemText}`
}














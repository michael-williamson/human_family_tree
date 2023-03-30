import React, { useReducer, useContext } from "react";
import {
  ADD,
  DATES,
  DESELECT_ALL,
  SELECT_ALL,
  SPECIES,
  SUBTRACT,
} from "../../../ConstantVariableNames";
import {
  buildDataArray,
  createCountObject,
  mapKeyComparison,
} from "../../../HelperFunctions/MapComponent/MapStateComponents";
import specimensArray from "../../../Data/anthroData.json";

export const MapLegendFieldsCountContext = React.createContext();
export const MapLegendFieldsCountUpdater = React.createContext();
export const SynchronizedDataObjectContext = React.createContext();

const synchronizedDataObject = buildDataArray(specimensArray);
export const loadedMapKeyComparison = mapKeyComparison(synchronizedDataObject);

export function useMapLegendFieldsCount() {
  return useContext(MapLegendFieldsCountContext);
}

export function useMapLegendFieldsCountUpdater() {
  return useContext(MapLegendFieldsCountUpdater);
}

export function useSynchronizedDataObjectContext() {
  return useContext(SynchronizedDataObjectContext);
}

function mapLegendFieldsCountReducer(
  state,
  {
    type,
    payload: {
      statePropertyName,
      individualProperty,
      mapLegendState,
      synchronizedDataObject = {},
    },
  }
) {
  if (type === SELECT_ALL || type === DESELECT_ALL) {
    if (type === DESELECT_ALL) {
      const datesObj = { ...state[DATES] };
      const speciesObj = { ...state[SPECIES] };
      [datesObj, speciesObj].forEach((item) => {
        Object.keys(item).forEach((statePropertyName) => {
          item[statePropertyName] = 0;
        });
      });

      return { [DATES]: datesObj, [SPECIES]: speciesObj };
    }
    const otherKeyProperty = statePropertyName === DATES ? SPECIES : DATES;
    const statePropertyObject = { ...state[statePropertyName] };
    const otherPropertyObject = { ...state[otherKeyProperty] };

    Object.keys(synchronizedDataObject.idObject).forEach((item) => {
      const objectItem = synchronizedDataObject["idObject"][item];
      if (mapLegendState[otherKeyProperty][objectItem[otherKeyProperty]]) {
        statePropertyObject[objectItem[statePropertyName]]++;
        otherPropertyObject[objectItem[otherKeyProperty]]++;
      }
    });
    return {
      [otherKeyProperty]: otherPropertyObject,
      [statePropertyName]: statePropertyObject,
    };
  }
  const countArr = loadedMapKeyComparison(
    mapLegendState,
    statePropertyName,
    individualProperty
  );

  const otherProperty = statePropertyName === DATES ? SPECIES : DATES;
  if (type === SUBTRACT) {
    const obj = {
      [statePropertyName]: { ...state[statePropertyName] },
      [otherProperty]: { ...state[otherProperty] },
    };

    countArr.forEach((item) => {
      obj[otherProperty][item[otherProperty]]--;
    });
    obj[statePropertyName][individualProperty] = 0;
    return {
      ...state,
      ...obj,
    };
  }
  if (type === ADD) {
    const obj = {
      [statePropertyName]: { ...state[statePropertyName] },
      [otherProperty]: { ...state[otherProperty] },
    };
    countArr.forEach((item) => {
      obj[statePropertyName][item[statePropertyName]] += 1;
      obj[otherProperty][item[otherProperty]] += 1;
    });
    return obj;
  }
}

export const MapLegendFieldsCount = ({ children }) => {
  const [fieldsCountObject, fieldsCountDispatch] = useReducer(
    mapLegendFieldsCountReducer,
    createCountObject(synchronizedDataObject, [SPECIES, DATES])
  );
  // const [synchronizedDataObject] = useState(synchronizedDataObject);
  return (
    <MapLegendFieldsCountContext.Provider value={fieldsCountObject}>
      <MapLegendFieldsCountUpdater.Provider value={fieldsCountDispatch}>
        <SynchronizedDataObjectContext.Provider value={synchronizedDataObject}>
          {children}
        </SynchronizedDataObjectContext.Provider>
      </MapLegendFieldsCountUpdater.Provider>
    </MapLegendFieldsCountContext.Provider>
  );
};

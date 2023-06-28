import React, { Dispatch, useContext, useState } from "react";
import { ReactChildrenProp } from "../../../Types/GlobalTypes";
import { keyObject } from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";
import { DATES } from "../../../ConstantVariableNames";

const initialCount = keyObject(DATES, 0);

const DatesCountContext = React.createContext(initialCount);
const DatesCountContextUpdater = React.createContext({} as Dispatch<any>);

export const useDatesCountContext = () => useContext(DatesCountContext);
export const useDatesCountUpdater = () => useContext(DatesCountContextUpdater);

export const DatesCountProvider = ({ children }: ReactChildrenProp) => {
  const [countObject, setCountObject] = useState(initialCount);
  return (
    <DatesCountContext.Provider value={countObject}>
      <DatesCountContextUpdater.Provider value={setCountObject}>
        {children}
      </DatesCountContextUpdater.Provider>
    </DatesCountContext.Provider>
  );
};

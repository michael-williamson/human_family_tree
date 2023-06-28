import React, { Dispatch, useContext, useState } from "react";
import { ReactChildrenProp } from "../../../Types/GlobalTypes";
import { keyObject } from "../../../HelperFunctions/MapComponent/MapContainerComponent/StateMaintenanceFN";
import { SPECIES } from "../../../ConstantVariableNames";

const initialCount = keyObject(SPECIES, 0);

const SpeciesCountContext = React.createContext(initialCount);
const SpeciesCountContextUpdater = React.createContext({} as Dispatch<any>);

export const useSpeciesCountContext = () => useContext(SpeciesCountContext);
export const useSpeciesCountUpdater = () =>
  useContext(SpeciesCountContextUpdater);

export const SpeciesCountProvider = ({ children }: ReactChildrenProp) => {
  const [countObject, setCountObject] = useState(initialCount);
  return (
    <SpeciesCountContext.Provider value={countObject}>
      <SpeciesCountContextUpdater.Provider value={setCountObject}>
        {children}
      </SpeciesCountContextUpdater.Provider>
    </SpeciesCountContext.Provider>
  );
};

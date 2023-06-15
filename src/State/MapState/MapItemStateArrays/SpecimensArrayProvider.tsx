import React, { useContext, useReducer } from "react";

const SpecimensArrayContext = React.createContext({});

export const useSpecimensArrayContext = () => {
  return useContext(SpecimensArrayContext);
};

export const SpecimensArrayProvider = ({ children }: any) => {
  const [specimensArray, specimensArrayDispatch] = useReducer(() => ({}), []);
  return (
    <SpecimensArrayContext.Provider value={{}}>
      {children}
    </SpecimensArrayContext.Provider>
  );
};

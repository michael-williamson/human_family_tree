import React, { useContext, useReducer } from "react";

const OverlaysArrayContext = React.createContext({});

export const useOverlaysArrayContext = () => {
  return useContext(OverlaysArrayContext);
};

export const OverlaysArrayProvider = ({ children }: any) => {
  const [overlaysArray, overlaysArrayDispatch] = useReducer(() => ({}), {});
  return (
    <OverlaysArrayContext.Provider value={{}}>
      {children}
    </OverlaysArrayContext.Provider>
  );
};

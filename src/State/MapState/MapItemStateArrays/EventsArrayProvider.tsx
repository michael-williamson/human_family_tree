import React, { useContext } from "react";

const EventsArrayContext = React.createContext({});

export const useEventsArrayContext = () => {
  return useContext(EventsArrayContext);
};

export const EventsArrayProvider = ({ children }: any) => {
  return (
    <EventsArrayContext.Provider value={{}}>
      {children}
    </EventsArrayContext.Provider>
  );
};

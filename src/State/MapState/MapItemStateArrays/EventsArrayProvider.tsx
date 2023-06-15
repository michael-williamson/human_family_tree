import React, { useContext, useReducer } from "react";

const EventsArrayContext = React.createContext({});

export const useEventsArrayContext = () => {
  return useContext(EventsArrayContext);
};

export const EventsArrayProvider = ({ children }: any) => {
  const [eventsArray, eventsArrayDispatch] = useReducer(() => ({}), {});
  return (
    <EventsArrayContext.Provider value={{}}>
      {children}
    </EventsArrayContext.Provider>
  );
};

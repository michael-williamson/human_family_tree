import { SpecimensArrayProvider } from "./SpecimensArrayProvider";
import { EventsArrayProvider } from "./EventsArrayProvider";
import { OverlaysArrayProvider } from "./OverlaysArrayProvider";
import { useCallback, useState } from "react";
import { httpRequest } from "../../../HTTP/httpRequests";
import { EVENTS, OVERLAYS, SPECIES } from "../../../ConstantVariableNames";
import { action as urlAction } from "../../../HelperFunctions/MapComponent/MapStateComponents";

interface DataStateObject {
  speciesData: {};
  datesData: {};
  overlaysData: {};
}

interface CheckboxHandlerObjectType {
  propertyName: string;
  fieldName: string;
  message: string;
}

export const MapArraysProvider = ({ children, action }: any) => {
  const [speciesData, setSpeciesData] = useState({});
  const [eventsData, setEventsData] = useState({});
  const [overlaysData, setOverlaysData] = useState({});
  const actionHandler = useCallback(
    async actionObject => {
      const { type: message, category: propertyName, fieldName } = actionObject;
      if (message === "initial") return null;
      const url = urlAction({ message, propertyName, fieldName });
      const data = await httpRequest(url);

      switch (propertyName) {
        case SPECIES:
          setSpeciesData(data);
          break;
        case EVENTS:
          setEventsData(data);
          break;
        case OVERLAYS:
          setOverlaysData(data);
          break;
        default:
          break;
      }
    },
    [setSpeciesData, setEventsData, setOverlaysData]
  );

  // actionHandler(action);

  return (
    <>
      <SpecimensArrayProvider data={speciesData}>
        <EventsArrayProvider data={eventsData}>
          <OverlaysArrayProvider data={overlaysData}>
            {children}
          </OverlaysArrayProvider>
        </EventsArrayProvider>
      </SpecimensArrayProvider>
    </>
  );
};

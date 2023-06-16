import { SpecimensArrayProvider } from "./SpecimensArrayProvider";
import { EventsArrayProvider } from "./EventsArrayProvider";
import { OverlaysArrayProvider } from "./OverlaysArrayProvider";
import { useCallback, useState } from "react";
import { action } from "../../../HelperFunctions/MapComponent/MapStateComponents";
import { httpRequest } from "../../../HTTP/httpRequests";
import { EVENTS, OVERLAYS, SPECIES } from "../../../ConstantVariableNames";

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

export const MapArraysProvider = ({ children }: any) => {
  const [speciesData, setSpeciesData] = useState({});
  const [eventsData, setEventsData] = useState({});
  const [overlaysData, setOverlaysData] = useState({});
  const checkboxHandler = useCallback(
    async (propertyName, fieldName, message) => {
      const url = action({ message, propertyName, fieldName });
      const data = httpRequest(url);

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
    []
  );
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

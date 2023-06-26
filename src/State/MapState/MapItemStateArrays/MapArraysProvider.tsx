import { SpecimensArrayProvider } from "./SpecimensArrayProvider";
import { EventsArrayProvider } from "./EventsArrayProvider";
import { OverlaysArrayProvider } from "./OverlaysArrayProvider";

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
  console.log("action: ", action);
  return (
    <>
      <SpecimensArrayProvider action={action}>
        <EventsArrayProvider action={action}>
          <OverlaysArrayProvider action={action}>
            {children}
          </OverlaysArrayProvider>
        </EventsArrayProvider>
      </SpecimensArrayProvider>
    </>
  );
};

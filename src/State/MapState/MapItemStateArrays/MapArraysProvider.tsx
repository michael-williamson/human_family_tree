import { SpecimensArrayProvider } from "./SpecimensArrayProvider";
import { EventsArrayProvider } from "./EventsArrayProvider";
import { OverlaysArrayProvider } from "./OverlaysArrayProvider";

export const MapArraysProvider = ({ children }: any) => {
  return (
    <>
      <SpecimensArrayProvider>
        <EventsArrayProvider>
          <OverlaysArrayProvider>{children}</OverlaysArrayProvider>
        </EventsArrayProvider>
      </SpecimensArrayProvider>
    </>
  );
};

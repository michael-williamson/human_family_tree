import { SpecimensArrayProvider } from "./SpecimensArrayProvider";
import { OverlaysArrayProvider } from "./OverlaysArrayProvider";

export const MapArraysProvider = ({ children }: any) => {
  return (
    <>
      <SpecimensArrayProvider>
        <OverlaysArrayProvider>{children}</OverlaysArrayProvider>
      </SpecimensArrayProvider>
    </>
  );
};

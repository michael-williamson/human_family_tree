import { SpeciesCountProvider } from "./SpeciesCountProvider";
import { DatesCountProvider } from "./DatesCountProvider";
import { ReactChildrenProp } from "../../../Types/GlobalTypes";

export const CountProvider = ({ children }: ReactChildrenProp) => {
  return (
    <>
      <SpeciesCountProvider>
        <DatesCountProvider>{children}</DatesCountProvider>
      </SpeciesCountProvider>
    </>
  );
};

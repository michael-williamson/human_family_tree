import { Container } from "../../ReusableComponents/Container";
import { SpeciesCheckboxList } from "./MapKeyCheckboxComponents/SpeciesCheckboxList";
import { DatesCheckboxList } from "./MapKeyCheckboxComponents/DatesCheckboxList";
import { OverlaysCheckboxList } from "./MapKeyCheckboxComponents/OverlaysCheckboxList";
import { checkboxListContainer } from "../../../Styles/MapComponentStyles/MapKeyComponentStyles";

export const CheckboxListContainer = () => {
  return (
    <Container containerStyles={checkboxListContainer}>
      <SpeciesCheckboxList />
      <DatesCheckboxList />
      <OverlaysCheckboxList />
    </Container>
  );
};

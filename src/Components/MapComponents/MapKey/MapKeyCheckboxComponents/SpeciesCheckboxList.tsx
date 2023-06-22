import { CheckboxListComponent } from "./CheckboxListComponent";
import { addSubtractType } from "../../../../HelperFunctions/State/MapLegendState";
import { OnChangeFunctionType } from "../../../../Types/GlobalTypes";
import {
  useSpeciesCheckbox,
  useSpeciesCheckboxUpdater,
} from "../../../../State/MapState/MapLegendState/SpeciesCheckboxProvider";
import { speciesArr } from "../../../../HelperFunctions/General";
import { SPECIES } from "../../../../ConstantVariableNames";
import {
  checkboxStyles,
  formControlStyles,
} from "../../../../Styles/MapComponentStyles/MapKeyComponentStyles";

export const SpeciesCheckboxList = () => {
  const speciesCheckboxUpdater = useSpeciesCheckboxUpdater();
  const speciesCheckboxState = useSpeciesCheckbox();
  const clickHandler: OnChangeFunctionType = e => {
    console.log("e: ", e);
    speciesCheckboxUpdater({
      type: addSubtractType(e.target.checked),
      category: e.target.dataset.category,
      fieldName: e.target.name,
    });
  };
  const inputProps = { "data-category": SPECIES };
  return (
    <>
      <CheckboxListComponent
        arr={speciesArr}
        state={speciesCheckboxState as {}}
        clickHandler={clickHandler}
        inputProps={inputProps}
        formControlStyles={formControlStyles}
        checkboxStyles={checkboxStyles}
      />
    </>
  );
};

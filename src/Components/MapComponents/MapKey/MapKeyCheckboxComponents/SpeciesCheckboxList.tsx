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
import { useSpecimensArrayContextUpdater } from "../../../../State/MapState/MapItemStateArrays/SpecimensArrayProvider";

export const SpeciesCheckboxList = () => {
  const speciesCheckboxUpdater = useSpeciesCheckboxUpdater();
  const speciesCheckboxState = useSpeciesCheckbox();
  const specimensArrayUpdater = useSpecimensArrayContextUpdater();
  const clickHandler: OnChangeFunctionType = e => {
    console.log("e: ", e);
    console.log("e.target.checked: ", e.target.checked);
    const action = {
      type: addSubtractType(e.target.checked),
      category: e.target.dataset.category,
      fieldName: e.target.name,
    };
    speciesCheckboxUpdater(action);
    specimensArrayUpdater(action);
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

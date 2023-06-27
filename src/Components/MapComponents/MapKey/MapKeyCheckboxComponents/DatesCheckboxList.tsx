import { CheckboxListComponent } from "./CheckboxListComponent";
import { DATES } from "../../../../ConstantVariableNames";
import { datesArr } from "../../../../HelperFunctions/General";
import {
  useDatesCheckbox,
  useDatesCheckboxUpdater,
} from "../../../../State/MapState/MapLegendState/DatesCheckboxProvider";
import { OnChangeFunctionType } from "../../../../Types/GlobalTypes";
import { addSubtractType } from "../../../../HelperFunctions/State/MapLegendState";
import {
  checkboxStyles,
  formControlStyles,
} from "../../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { useSpecimensArrayContextUpdater } from "../../../../State/MapState/MapItemStateArrays/SpecimensArrayProvider";
import { useSpeciesCheckbox } from "../../../../State/MapState/MapLegendState/SpeciesCheckboxProvider";

export const DatesCheckboxList = () => {
  const datesCheckboxState = useDatesCheckbox();
  const speciesCheckboxState = useSpeciesCheckbox();
  const datesCheckboxUpdater = useDatesCheckboxUpdater();
  const specimensArrayUpdater = useSpecimensArrayContextUpdater();
  const clickHandler: OnChangeFunctionType = e => {
    console.log("e: ", e);
    const action = {
      type: addSubtractType(e.target.checked),
      category: e.target.dataset.category,
      fieldName: e.target.name,
      checkboxState: speciesCheckboxState,
    };
    datesCheckboxUpdater(action);
    specimensArrayUpdater(action);
  };
  const inputProps = { "data-category": DATES };
  return (
    <>
      <CheckboxListComponent
        arr={datesArr}
        state={datesCheckboxState as {}}
        clickHandler={clickHandler}
        inputProps={inputProps}
        formControlStyles={formControlStyles}
        checkboxStyles={checkboxStyles}
      />
    </>
  );
};

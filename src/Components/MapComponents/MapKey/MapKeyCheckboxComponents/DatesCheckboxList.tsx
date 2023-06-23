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

export const DatesCheckboxList = () => {
  const datesCheckboxState = useDatesCheckbox();
  const datesCheckboxUpdater = useDatesCheckboxUpdater();
  const clickHandler: OnChangeFunctionType = e => {
    console.log("e: ", e);
    datesCheckboxUpdater({
      type: addSubtractType(e.target.checked),
      category: e.target.dataset.category,
      fieldName: e.target.name,
    });
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

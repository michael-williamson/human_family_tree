import { Checkbox, FormControlLabel } from "@mui/material";
import { OnChangeFunctionType } from "../../../../Types/GlobalTypes";

// easy copy paste
// <CheckboxListComponent arr={[]} state={{}} clickHandler={(e)=>null}/>

interface KeyNameType {
  [key: string]: boolean | undefined;
}

interface CheckboxListTypes {
  arr: Array<any>;
  state: KeyNameType;
  clickHandler: OnChangeFunctionType;
  inputProps?: object;
  checkboxStyles?: object;
  formControlStyles?: object;
}

export const CheckboxListComponent = ({
  arr,
  state,
  inputProps,
  checkboxStyles,
  formControlStyles,
  clickHandler,
}: CheckboxListTypes) => {
  return (
    <div>
      {arr.map((item: string) => {
        return (
          <FormControlLabel
            key={item}
            label={item}
            checked={state[item]}
            sx={formControlStyles}
            control={
              <Checkbox
                key={item}
                sx={checkboxStyles}
                inputProps={inputProps}
                name={item}
                onChange={clickHandler}
              />
            }
          />
        );
      })}
    </div>
  );
};

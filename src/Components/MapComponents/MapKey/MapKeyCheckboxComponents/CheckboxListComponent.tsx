import { Checkbox, FormControlLabel } from "@mui/material";
import { OnChangeFunctionType } from "../../../../Types/GlobalTypes";
import { CheckboxLIstTitle } from "./CheckboxLIstTitle";
import { Container } from "../../../ReusableComponents/Container";
import {
  checkboxListContainerStyles,
  checkboxListStyles,
} from "../../../../Styles/MapComponentStyles/MapKeyComponentStyles";
import { CustomLabel } from "../../../ReusableComponents/CustomLabel";
import { countLabelCreator } from "../../../../HelperFunctions/General";

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
  titleText?: string;
  customLabelProps: any;
}

const checkboxChecked = (state: any, item: string) => {
  return state[item];
};

export const CheckboxListComponent = ({
  arr,

  state,
  inputProps,
  checkboxStyles,
  formControlStyles,
  clickHandler,
  titleText,
  customLabelProps: {
    labelStyle,
    labelCreator = () => "label",
    addOn = { label: "label" },
  },
}: CheckboxListTypes) => {
  return (
    <Container containerStyles={checkboxListContainerStyles}>
      <CheckboxLIstTitle />
      <Container containerStyles={checkboxListStyles}>
        {arr.map((item: string) => {
          return (
            <FormControlLabel
              key={item}
              disableTypography={true}
              label={countLabelCreator(item, addOn[item])}
              checked={state[item]}
              sx={formControlStyles}
              control={
                <Checkbox
                  sx={checkboxStyles}
                  inputProps={inputProps}
                  name={item}
                  onChange={clickHandler}
                />
              }
            />
          );
        })}
      </Container>
    </Container>
  );
};

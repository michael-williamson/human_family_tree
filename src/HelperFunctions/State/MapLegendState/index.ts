import { ADD, SUBTRACT } from "../../../ConstantVariableNames";

export const reducer = (state:any,action:any) => {
    const {fieldName,type} = action;
    return {
        ...state,
        [fieldName]: checkedType(type),
      };
}

export const addSubtractType = (bool:boolean) => bool?ADD:SUBTRACT;

export const checkedType = (type:string) => type === ADD 
import { ActionType } from './../../../Types/StateTypes/index';
import { ADD, SUBTRACT } from "../../../ConstantVariableNames";

export const reducer = (state:any,action:any) => {
    const {fieldName,type} = action;
    return {
        ...state,
        [fieldName]: checkedType(type),
      };
}

export const providerControlFlow = ({state,action,providerCategory,dispatch}:any) => {
    const {category,fieldName,type} = action as ActionType;

    if(category !== providerCategory)return;
    if(addSubtractType(state[fieldName])===type )return;
    dispatch(action)
}

export const addSubtractType = (bool:boolean) => bool?ADD:SUBTRACT;

export const checkedType = (type:string) => type === ADD 
import { ADD, SUBTRACT } from "../../../ConstantVariableNames";

export const arrayReducer = (state:any,obj:any) => {
    console.log('obj: ', obj);
    const {type,data,fieldName} = obj;

    switch (type) {
            case ADD:
            return [...state,...data];
            case SUBTRACT:
            return [...state.filter((item:any)=>{
               return item.species !== fieldName;
            })]

    }
}
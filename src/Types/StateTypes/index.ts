export interface ActionType {
    type:string;
    category:string;
    fieldName:string;
    checkboxState?:any;
}

export interface ArrayDispatch {
    data:[]

}
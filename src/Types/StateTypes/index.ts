export interface ActionType {
    type:string;
    category:string;
    fieldName:string;
    checkboxState?:any;
    count?:any;
}

export interface ArrayDispatch {
    data:[]

}
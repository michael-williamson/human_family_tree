interface CounterFunc {

    (countObject:any,property:string,bool:boolean):any
}

export const counter:CounterFunc = (countObject,property,bool) => {

     bool ? countObject[property]++:countObject[property]--;

    return;
}
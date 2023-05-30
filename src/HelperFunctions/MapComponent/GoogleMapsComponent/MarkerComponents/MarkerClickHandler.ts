export const clickHandlerFactory = (cb: any,arr: any,typeOfMarker:string) => {
   const stateObject :any = {};
    arr.forEach((item: {  ID:string })=>{
        let key = item.ID;
        stateObject[key] = cb(typeOfMarker,item)
    })
    return stateObject;
}
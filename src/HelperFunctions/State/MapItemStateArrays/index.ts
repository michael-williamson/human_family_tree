import { ADD, DESELECT_ALL, SELECT_ALL, SUBTRACT } from "../../../ConstantVariableNames";

export const filterBySpecies = (state:any,fieldName:string) => {
    return [
        ...state.filter((item: any) => {
          return item.species !== fieldName;
        }),
      ];
}

export const filterByName = (state:any,fieldName:string) => {
    console.log('fieldName: ', fieldName);
    return [
        ...state.filter((item: any) => {
          return item.name !== fieldName;
        }),
      ];
}

export const addSingleOverlay = (state:any,fieldName:string,data:[]) => {
    return [...state,data.find((item:any)=>item.name === fieldName)]
}

export const addSpeciesCategory = (state:any,fieldName:string,data:[]) => {
    return [...state,...data]
}


export const arrayReducer = (state:any,obj:any) => {
    console.log('obj: ', obj);
    const {type,data,fieldName,filterFN,addFN} = obj;

    switch (type) {
      case SELECT_ALL:
        return [...data];
      case DESELECT_ALL:
        return [];
      case ADD:
        return addFN(state,fieldName,data);
      case SUBTRACT:
        return filterFN(state,fieldName)
    }
}
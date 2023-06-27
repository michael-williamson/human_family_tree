import { ADD, DESELECT_ALL, SELECT_ALL, SPECIES, SUBTRACT } from "../../../ConstantVariableNames";

interface ReducerData {
  state:any;
  fieldName:string;
  category?:string;
  data?:[]
}

export const filterBySpecies = ({state,fieldName,category}:ReducerData) => {
    const speciesPropertyFiltered = [
        ...state.filter((item: any) => {
          return item.species !== fieldName;
        }),
      ];
    const datesPropertyFiltered = [
      ...state.filter((item: any) => {
        return item.dates !== fieldName;
      })
    ]
    return category === SPECIES? speciesPropertyFiltered:datesPropertyFiltered;
}

export const filterByName = ({state,fieldName}:ReducerData) => {
    console.log('fieldName: ', fieldName);
    return [
        ...state.filter((item: any) => {
          return item.name !== fieldName;
        }),
      ];
}

export const addSingleOverlay = ({state,fieldName,data=[]}:ReducerData) => {
    return [...state,data.find((item:any)=>item.name === fieldName)]
}

export const addSpeciesCategory = ({state,data=[]}:ReducerData) => {
  console.log('data: ', data);
    return [...state,...data]
}


export const arrayReducer = (state:any,obj:any) => {
    console.log('obj: ', obj);
    const {type,data,fieldName,category,reducerFN} = obj;

    switch (type) {
      case SELECT_ALL:
        return [...data];
      case DESELECT_ALL:
        return [];
      case ADD:
        return reducerFN({state,fieldName,category,data});
      case SUBTRACT:
        return reducerFN({state,fieldName,category,data})
    }
}
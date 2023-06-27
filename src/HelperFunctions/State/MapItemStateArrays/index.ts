import { ADD, DATES, DESELECT_ALL, SELECT_ALL, SPECIES, SUBTRACT } from "../../../ConstantVariableNames";

interface ReducerData {
  state:any;
  fieldName:string;
  category?:string;
  data?:[]
  checkboxState?:any;
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
    return [
        ...state.filter((item: any) => {
          return item.name !== fieldName;
        }),
      ];
}

export const addSingleOverlay = ({state,fieldName,data=[]}:ReducerData) => {
    return [...state,data.find((item:any)=>item.name === fieldName)]
}

export const addSpeciesCategory = ({state,data=[],category,checkboxState}:ReducerData) => {
    if(category===SPECIES){
      return [...state,...data.filter((item:any)=>{
        const prop = item[DATES];
        return checkboxState[prop];

      })]
    }
    return [...state,...data.filter((item:any)=>{
      const prop = item[SPECIES];
      return checkboxState[prop];
    })]
}


export const arrayReducer = (state:any,obj:any) => {
    console.log('obj: ', obj);
    const {type,data,fieldName,category,reducerFN,checkboxState} = obj;

    switch (type) {
      case SELECT_ALL:
        return [...data];
      case DESELECT_ALL:
        return [];
      case ADD:
        return reducerFN({state,fieldName,category,data,checkboxState});
      case SUBTRACT:
        return reducerFN({state,fieldName,category,data,checkboxState})
    }
}
import { ADD, DATES, DESELECT_ALL, SELECT_ALL, SPECIES, SUBTRACT } from "../../../ConstantVariableNames";
import { counter } from "../MapCountState";

interface ReducerData {
  state:any;
  fieldName:string;
  category?:string;
  data?:any[]
  checkboxState?:any;
  count?:any;
  setCountState:any;
}

// Part of the item subtraction 
export const filterBySpecies = ({state,fieldName,category,count,setCountState}:ReducerData) => {
  const countClone = {...count};
    const speciesPropertyFiltered = [
        ...state.filter((item: any) => {
          item.species === fieldName && countClone[item.species]--
          return item.species !== fieldName;
        }),
      ];
    const datesPropertyFiltered = [
      ...state.filter((item: any) => {
        item.dates === fieldName && countClone[item.dates]--
        return item.dates !== fieldName;
      })
    ]
    setCountState(countClone)
    return category === SPECIES? speciesPropertyFiltered:datesPropertyFiltered;
}

// Part of the item subtraction 
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

// Part of adding an item to state
export const addSpeciesCategory = ({state,data=[],category,checkboxState,count,setCountState}:ReducerData) => {
  const countClone = {...count}
    if(category===SPECIES){
      const stateArray = [...state,...data.filter((item:any)=>{

        const prop = item[DATES];
        const speciesProp = item[SPECIES]
        const propertyBool = checkboxState[prop];
        counter(countClone,speciesProp,propertyBool)
        return propertyBool;

      })]
      setCountState(countClone);
      return stateArray;
    }
    const stateArray = [...state,...data.filter((item:any)=>{
      const prop = item[SPECIES];
      const datesProp = item[DATES]
      const propertyBool = checkboxState[prop]
      counter(countClone,datesProp,propertyBool)
      return checkboxState[prop];
    })]
    setCountState(countClone);
    return stateArray;
}

export const addSingleSpecimen = ({state,data=[{}],category,checkboxState,count,setCountState}:ReducerData) => {
  // const countClone = {...count}
  // data.forEach(item=>{
  //   const prop = item[SPECIES];
  //   const datesProp = item[DATES]
  //   const propertyBool = checkboxState[prop]
  //   counter(countClone,datesProp,propertyBool)
  // })

  // setCountState(countClone);
  return [...state,...data]

}


export const arrayReducer = (state:any,obj:any) => {
    const {type,data,fieldName,category,reducerFN,checkboxState,count,setCountState} = obj;

    switch (type) {
      case SELECT_ALL:
        return [...data];
      case DESELECT_ALL:
        return [];
      case ADD:
        return reducerFN({state,fieldName,category,data,checkboxState,count,setCountState});
      case SUBTRACT:
        return reducerFN({state,fieldName,category,data,checkboxState,count,setCountState})
    }
}
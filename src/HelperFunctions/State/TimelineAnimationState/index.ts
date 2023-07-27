import { datesCategoryObj } from './../../General/index';

export const ratesObj = {
    "value_one":{
        progressValue:0,
        rateMessage:"FOUR_TIMES"
    },
    "value_two":{
        progressValue:25,
        rateMessage:"TWO_TIMES"
    },
    "value_three":{
        progressValue:50,
        rateMessage:"REMAINING"
    }
}

export const progressValueObj = {
    "0":"FOUR_TIMES",
    "25":"TWO_TIMES",
    "50":"REMAINING"
}

export const rateCreator = () => {

}


export const datesPropertyComparison = (datesArr:string[],currentYear:number,specimensByDate:any) => {
    let arr:any[]= [];
    while(eliminatingProps(datesArr[0],currentYear)){
        const prop = datesArr[0];
        datesArr.shift();
        arr = [...arr,...specimensByDate[prop].itemsArr]
        continue;
    }

    if(datesProperty(datesArr[0],currentYear)){
        const prop = datesArr[0];
        datesArr.shift();
        arr = specimensByDate[prop].itemsArr; 
    }
    return arr;

   }

   export const eliminatingProps = (prop:string,currentYear:number) => {
    if(typeof prop === "undefined"){
        return false;
    }
    const datesCategoryObjClone:{[key:string]:any} = {...datesCategoryObj}
    const currentYearObject= datesCategoryObjClone[prop]
    console.log('currentYearObject: ', currentYearObject);
    console.log('prop: ', prop);
    return currentYear <= currentYearObject.lesser
   }

export const datesProperty = (prop:string,currentYear:number) => {
    if(typeof prop === "undefined"){
        return false;
    }
    const datesCategoryObjClone:{[key:string]:any} = {...datesCategoryObj}
   const currentYearObject= datesCategoryObjClone[prop]
//    console.log('currentYearObject: ', currentYearObject);
   return currentYear <= currentYearObject.greater && currentYear > currentYearObject.lesser;
}
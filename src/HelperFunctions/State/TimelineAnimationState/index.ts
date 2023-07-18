import { arrayReducer } from '../MapItemStateArrays';
import { datesCategoryObj } from './../../General/index';


export const datesPropertyComparison = (datesArr:string[],currentYear:number,specimensByDate:any) => {
    // console.log('specimensByDate: ', specimensByDate);
    // console.log('currentYear: ', currentYear);
    // console.log('datesArr: ', datesArr);
    let arr:any[]= [];
    while(eliminatingProps(datesArr[0],currentYear)){
        const prop = datesArr[0];
        console.log('prop: ', prop);
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
    const datesCategoryObjClone:{[key:string]:any} = {...datesCategoryObj}
    const currentYearObject= datesCategoryObjClone[prop]
    return currentYear <= currentYearObject.lesser
   }

export const datesProperty = (prop:string,currentYear:number) => {
    const datesCategoryObjClone:{[key:string]:any} = {...datesCategoryObj}
   const currentYearObject= datesCategoryObjClone[prop]
//    console.log('currentYearObject: ', currentYearObject);
   return currentYear <= currentYearObject.greater && currentYear > currentYearObject.lesser;
}
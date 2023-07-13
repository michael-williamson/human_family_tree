import { datesCategoryObj } from './../../General/index';


export const datesPropertyComparison = (datesArr:string[],currentYear:number,specimensByDate:any) => {
    console.log('currentYear: ', currentYear);
    console.log('datesArr: ', datesArr);

    if(datesProperty(datesArr[0],currentYear)){
        const prop = datesArr[0];
        datesArr.shift();
        return specimensByDate[prop].itemsArr
    }
    return null;

   }

export const datesProperty = (prop:string,currentYear:number) => {
    const datesCategoryObjClone:{[key:string]:any} = {...datesCategoryObj}
   const currentYearObject= datesCategoryObjClone[prop]
   console.log('currentYearObject: ', currentYearObject);
   return currentYear < currentYearObject.greater && currentYear > currentYearObject.lesser;
}
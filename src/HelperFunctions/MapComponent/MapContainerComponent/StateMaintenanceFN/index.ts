import {
  speciesArr,
  datesArr,
  overlaysArray,
  eventsArray,
} from "../../../General";

const arraysObject:{[key:string]:any} = {
  species: speciesArr,
  dates: datesArr,
  overlays: overlaysArray,
  events: eventsArray,
};

// $*$_tbg keyObject to be globalized
export const keyObject = (propName:string, value:boolean|number) => {
  const object = {} as {[key:string]:boolean|number};
  arraysObject[propName].forEach((item:string) => {
    object[item] = value;
  });

 return object;
};

export const speciesKeyObject = () => keyObject("species", true);

export const datesKeyObject = () => keyObject("dates", true);

export const overlaysKeyObject = () => keyObject("overlays", true);

export const eventsKeyObject = () => keyObject("events", true);

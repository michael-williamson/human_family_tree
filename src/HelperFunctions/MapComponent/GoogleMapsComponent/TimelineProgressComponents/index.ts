export const marksArrayCreator = () => {
    const totalTime = 2000000;
    const yearObject:{[key:string]:number} = {
        "2 MYA":2000000,
        "500 TYA":500000,
        "200 TYA":200000,
        "100 TYA":100000,
        "75 TYA":75000,
        "50 TYA":50000,
        "25 TYA":25000,
        "present": 0
    }

    return Object.keys(yearObject).map(item=>{
        const timeMarker = yearObject[item];
        return singleMarkObject(totalTime,timeMarker,item)
    })
}

export const valueCalculator = (totalTime:number,timeMarker:number) => {
 const diff = totalTime - timeMarker;
 const percent = totalTime / 100;
 const diffPercent = diff / percent;
 return diffPercent;

}

export const singleMarkObject = (totalTime:number,timeMarker:number,label:string) => {
    return {
        value:valueCalculator(totalTime,timeMarker),
        label
    }
}

//experiment 

function isNumberFinite(value: unknown): value is number {
  return (typeof value === 'number' || value instanceof Number) && isFinite(+value);
}
export {
  isNumberFinite as isFinite,
};

export function finiteOrDefault(value: unknown, defaultValue: number) {
  return isNumberFinite(value) ? value : defaultValue;
}

export const log10Floor = (val:any) => {
return Math.floor(Math.log10(val))

}

function startExp(min:any, max:any) {
  const range = max - min;
  let rangeExp = log10Floor(range);
  while (steps(min, max, rangeExp) > 10) {
    rangeExp++;
  }
  while (steps(min, max, rangeExp) < 10) {
    rangeExp--;
  }
  return Math.min(rangeExp, log10Floor(min));
}

function steps(min: number, max: number, rangeExp: number) {
  const rangeStep = Math.pow(10, rangeExp);
  const start = Math.floor(min / rangeStep);
  const end = Math.ceil(max / rangeStep);
  return end - start;
}

function isMajor(tickVal: any) {
  const remain = tickVal / (Math.pow(10, log10Floor(tickVal)));
  return remain === 1;
}

export const  generateTicks = (generationOptions:any, {min, max}:any) =>{
  min = finiteOrDefault(generationOptions.min, min);
  const ticks = [];
  const minExp = log10Floor(min);
  let exp = startExp(min, max);
  let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
  const stepSize = Math.pow(10, exp);
  const base = minExp > exp ? Math.pow(10, minExp) : 0;
  const start = Math.round((min - base) * precision) / precision;
  const offset = Math.floor((min - base) / stepSize / 10) * stepSize * 10;
  let significand = Math.floor((start - offset) / Math.pow(10, exp));
  let value:any = finiteOrDefault(generationOptions.min, Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision);
  while (value < max) {
    ticks.push({value, major: isMajor(value), significand});
    if (significand >= 10) {
      significand = significand < 15 ? 15 : 20;
    } else {
      significand++;
    }
    if (significand >= 20) {
      exp++;
      significand = 2;
      precision = exp >= 0 ? 1 : precision;
    }
    value = Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision;
  }
  const lastTick = finiteOrDefault(generationOptions.max, value);
  ticks.push({value: lastTick, major: isMajor(lastTick), significand});

  return ticks;
}

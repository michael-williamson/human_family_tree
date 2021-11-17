import {
  beardedManIconBlack,
  beardedManIconBlue,
  beardedManIconGreen,
  beardedManIconYellow,
  beardedManIconWhite,
  beardedManIconPurple,
  beardedManIconAqua,
  beardedManIconLiteGrey,
  beardedManIconOrange,
  beardedManIconRed,
  beardedManIconLitePurple,
  beardedManIconBrightYellow,
  lakeTobaIcon,
  fireIcon,
  rockIcon,
  clothingIcon,
  caveArtIcon,
  bowIcon,
  fluteIcon,
  fishHookIcon,
} from "../media/index";

export const librariesArr = ["drawing"];

export const speciesArr = [
  "habilis",
  "rudolfensis",
  "erectus",
  "floresiensis",
  "luzonensis",
  "antecessor",
  "heidelbergensis",
  "neanderthalensis",
  "denisovan",
  "Red Deer Cave People",
  "sapiens",
  "longi",
];

export const speciesColors = [
  "rgba(27,87,217,1)",
  "rgba(182,212,38,1)",
  "rgba(59,152,208,1)",
  "rgba(249,184,115,1)",
  "rgba(225,240,180,1)",
  "rgba(12,47,147,1)",
  "rgba(153,175,244,1)",
  "rgba(232,42,216,1)",
  "rgba(200,200,220,1)",
  "rgba(120,115,97,1)",
  "rgba(22,218,188,1)",
  "rgba(224,142,124,1)",
];

export const datesCategoryProps = [
  "> 2,000,000",
  "2,000,000 - 1,500,000",
  "1,500,000 - 1,000,000",
  "1,000,000 - 800,000",
  "800,000 - 700,000",
  "700,000 - 600,000",
  "600,000 - 500,000",
  "500,000 - 400,000",
  "400,000 - 300,000",
  "300,000 - 200,000",
  "200,000 - 100,000",
  "100,000 - 70,000",
  "70,000 - 50,000",
  "50,000 - 40,000",
  "40,000 - 30,000",
  "30,000 - 20,000",
  "20,000 - 10,000",
  "10,000 - present",
];

export const greenSaharaDates = ["placeholder"];
export const greenArabiaDates = ["placeholder"];

export const datesCategoryObj = {
  "> 2,000,000": { greater: 4000000, lesser: 2000000 },
  "2,000,000 - 1,500,000": { greater: 2000000, lesser: 1500000 },
  "1,500,000 - 1,000,000": { greater: 1500000, lesser: 1000000 },
  "1,000,000 - 800,000": { greater: 1000000, lesser: 800000 },
  "800,000 - 700,000": { greater: 800000, lesser: 700000 },
  "700,000 - 600,000": { greater: 700000, lesser: 600000 },
  "600,000 - 500,000": { greater: 600000, lesser: 500000 },
  "500,000 - 400,000": { greater: 500000, lesser: 400000 },
  "400,000 - 300,000": { greater: 400000, lesser: 300000 },
  "300,000 - 200,000": { greater: 300000, lesser: 200000 },
  "200,000 - 100,000": { greater: 200000, lesser: 100000 },
  "100,000 - 70,000": { greater: 100000, lesser: 70000 },
  "70,000 - 50,000": { greater: 70000, lesser: 50000 },
  "50,000 - 40,000": { greater: 50000, lesser: 40000 },
  "40,000 - 30,000": { greater: 40000, lesser: 30000 },
  "30,000 - 20,000": { greater: 30000, lesser: 20000 },
  "20,000 - 10,000": { greater: 20000, lesser: 10000 },
  "10,000 - present": { greater: 10000, lesser: 0 },
};

export const datesCatergoryGreater = {
  4000000: { timePeriod: "> 2,000,000", greater: 4000000, lesser: 2000001 },
  2000000: {
    timePeriod: "2,000,000 - 1,500,000",
    greater: 2000000,
    lesser: 1500001,
  },
  1500000: {
    timePeriod: "1,500,000 - 1,000,000",
    greater: 1500000,
    lesser: 1000001,
  },
  1000000: {
    timePeriod: "1,000,000 - 800,000",
    greater: 1000000,
    lesser: 800001,
  },
  800000: { timePeriod: "800,000 - 600,000", greater: 800000, lesser: 600001 },
  600000: { timePeriod: "600,000 - 500,000", greater: 600000, lesser: 500001 },
  500000: { timePeriod: "500,000 - 400,000", greater: 500000, lesser: 400001 },
  400000: { timePeriod: "400,000 - 300,000", greater: 400000, lesser: 300001 },
  300000: { timePeriod: "300,000 - 200,000", greater: 300000, lesser: 200001 },
  200000: { timePeriod: "200,000 - 100,000", greater: 200000, lesser: 100001 },
  100000: { timePeriod: "100,000 - 70,000", greater: 100000, lesser: 70001 },
  70000: { timePeriod: "70,000 - 50,000", greater: 70000, lesser: 50001 },
  50000: { timePeriod: "50,000 - 40,000", greater: 50000, lesser: 40001 },
  40000: { timePeriod: "40,000 - 30,000", greater: 40000, lesser: 30001 },
  30000: { timePeriod: "30,000 - 20,000", greater: 30000, lesser: 20001 },
  20000: { timePeriod: "20,000 - 10,000", greater: 20000, lesser: 10001 },
  10000: { timePeriod: "10,000 - present", greater: 10000, lesser: 1 },
};

export const imageFiles = {
  habilis: beardedManIconBlack,
  erectus: beardedManIconYellow,
  rudolfensis: beardedManIconBlue,
  sapiens: beardedManIconGreen,
  heidelbergensis: beardedManIconWhite,
  neanderthalensis: beardedManIconPurple,
  denisovan: beardedManIconAqua,
  "Red Deer Cave People": beardedManIconRed,
  floresiensis: beardedManIconLiteGrey,
  luzonensis: beardedManIconOrange,
  longi: beardedManIconLitePurple,
  antecessor: beardedManIconBrightYellow,
};

export const northAmericaGlacialTimeline = {
  "900,000 - 780,000": { greater: 900000, lesser: 780000 },
  "640,000 - 500,000": { greater: 640000, lesser: 500000 },
  "350,000 - 140,000": { greater: 350000, lesser: 140000 },
  "60,000 - 13,000": { greater: 60000, lesser: 13000 },
};

export const europeanGlacialTimeline = {
  "1,500,000 - 1,300,000": { greater: 1500000, lesser: 1300000 },
  "900,000 - 780,000": { greater: 900000, lesser: 780000 },
  "640,000 - 500,000": { greater: 640000, lesser: 500000 },
  "350,000 - 140,000": { greater: 350000, lesser: 140000 },
  "60,000 - 13,000": { greater: 60000, lesser: 13000 },
};
export const europeanGlacialTimelineGreater = {
  1500000: {
    greater: 1500000,
    lesser: 1300000,
    timePeriod: "1,500,000 - 1,300,000",
  },
  900000: { greater: 900000, lesser: 780000, timePeriod: "900,000 - 780,000" },
  640000: { greater: 640000, lesser: 500000, timePeriod: "640,000 - 500,000" },
  350000: { greater: 350000, lesser: 140000, timePeriod: "350,000 - 140,000" },
  60000: { greater: 60000, lesser: 13000, timePeriod: "60,000 - 13,000" },
};

export const iceAgeDatesArr = [
  "1,500,000 - 1,300,000",
  "900,000 - 780,000",
  "640,000 - 500,000",
  "350,000 - 140,000",
  "60,000 - 13,000",
];
export const iceAgeDatesArrComparator = [
  13001, 60000, 140001, 350000, 500001, 640000, 780001, 900000, 1300001,
  1500000,
];

export const iceAgeDatesCounter = [1, 2, 2, 3, 5];

export const eventIconObject = {
  "Acheulean Stone Technology": rockIcon,
  "Aurignacian Stone Technology": rockIcon,
  "Bow and Arrow Technology": bowIcon,
  "Cave Painting": caveArtIcon,
  "Clothing Technology": clothingIcon,
  "Control of Fire": fireIcon,
  "Fishing Technology": fishHookIcon,
  "Lake Toba Eruption": lakeTobaIcon,
  "Levallois Stone Technology": rockIcon,
  "Microlith Stone Technology": rockIcon,
  "Musical Instrument Technology": fluteIcon,
  "Oldowan Stone Technology": rockIcon,
};

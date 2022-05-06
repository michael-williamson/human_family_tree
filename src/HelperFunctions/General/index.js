import { Box } from "@mui/system";

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

export const datesArr = [
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

export const overlaysArray = [
  "Green Sahara",
  "Green Arabia",
  "North American Ice Sheet",
  "European Ice Sheet",
];

//corresponding lesser and greater dates for each property, each property will act as labels for checkboxes and other user interface displays
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

let rgbRandomNumberRounded = () => Math.floor(Math.random() * 256);

export const randomColorGenerator = (transparency) =>
  `rgba(${rgbRandomNumberRounded()},${rgbRandomNumberRounded()},${rgbRandomNumberRounded()}${
    transparency ? `,${1 * Math.random()}` : ""
  })`;

export const svgObjectFN = (colorObject, svgObject) => {
  const objectToConstruct = {};
  Object.keys(colorObject).forEach((item) => {
    objectToConstruct[item] = (
      <Box>
        <svg
          width={svgObject.width}
          height={svgObject.height}
          display="inline-block"
        >
          <circle
            cx={svgObject.width / 2}
            cy={svgObject.height / 2}
            r="10"
            stroke={colorObject[item]}
            strokeWidth="3"
            fill={colorObject[item]}
          />
        </svg>
      </Box>
    );
  });
  return { ...objectToConstruct };
};

export const returnSVGObjectItem = (svgObject, item) => {
  return svgObject[item];
};

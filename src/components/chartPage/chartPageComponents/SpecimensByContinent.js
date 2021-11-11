import React from "react";
import { Box } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import anthroData from "../../../data/anthroData.json";

const continentsArray = [
  "Africa",
  "Europe",
  "Asia",
  "Australia",
  "North America",
  "South America",
];

function DataSetItem(data, fillBool, colorArray) {
  this.data = data;
  this.fillBool = fillBool;
  this.backgroundColor = colorArray;
  this.borderColor = colorArray;
}

const colorGenerator = (length) => {
  const colorArray = [];
  const colorRandomizer = () => {
    let randomNum = Math.random() * 255;
    randomNum = Math.ceil(randomNum);
    return randomNum;
  };
  for (let i = 0; i < length; i++) {
    colorArray.push(
      `rgba(${colorRandomizer()},${colorRandomizer()},${colorRandomizer()},1)`
    );
  }
  return colorArray;
};

const continentCountObject = () => {
  const colorArray = colorGenerator(continentsArray.length);
  const resultObject = {};
  anthroData.forEach((item) => {
    const currentContinent = item.continent;
    if (resultObject[currentContinent]) {
      resultObject[currentContinent] += 1;
    } else {
      resultObject[currentContinent] = 1;
    }
  });
  const dataArray = [];

  for (const prop of continentsArray) {
    dataArray.push(resultObject[prop]);
  }
  return new DataSetItem(dataArray, false, colorArray);
};

const data = {
  labels: continentsArray,
  datasets: [continentCountObject()],
};

const options = {
  plugins: {
    title: {
      display: true,
      align: "left",
      text: "Specimens By Continent",
      font: {
        size: 40,
        weight: "bold",
      },
    },
    legend: {
      display: false,
      labels: {
        pointStyle: "circle",
        usePointStyle: true,
      },
    },
  },
  layout: {
    padding: { top: 20, left: 0, right: 0, bottom: 0 },
  },
  scales: {
    y: {
      ticks: {
        // color: "darkblue",
        font: {
          size: 15,
          weight: "bold",
        },
      },
      beginAtZero: true,
      title: {
        display: true,
        text: "Specimens",
        // color: "darkgreen",
        font: {
          size: 30,
          weight: "bold",
        },
        padding: { top: 20, left: 0, right: 0, bottom: 0 },
      },
    },
    x: {
      ticks: {
        // color: "darkblue",
        font: {
          size: 15,
          weight: "bold",
        },
      },
      beginAtZero: false,
      title: {
        display: false,
        text: "Continents",
        font: {
          size: 30,
          weight: "bold",
        },
        padding: { top: 20, left: 0, right: 0, bottom: 0 },
      },
    },
  },
  maintainAspectRatio: false,
  elements: {
    bar: {
      pointStyle: "circle",
    },
  },
};

export const SpecimensByContinent = () => {
  return (
    <Box>
      {/* <Box fontSize={40} fontWeight="bold">
        Specimens By Continent
      </Box> */}

      <div>
        <Bar data={data} options={options} height={400} width={400} />
      </div>
    </Box>
  );
};

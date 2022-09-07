import React from "react";
import { Box } from "@mui/system";
import { Bar } from "react-chartjs-2";
import anthroData from "../../../Data/anthroData.json";
import { colorGenerator } from "../../../HelperFunctions/ChartComponent";

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
  this.backgroundColor = colorArray[0];
  this.borderColor = colorArray[1];
}

const continentCountObject = () => {
  const colorArray = colorGenerator(continentsArray.length, 0.2, 1);
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
  animation: {
    delay: 1000,
    duration: 2000,
  },
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
        font: {
          size: 15,
          weight: "bold",
        },
      },
      beginAtZero: true,
      title: {
        display: false,
        text: "Specimens",
        font: {
          size: 30,
          weight: "bold",
        },
        padding: { top: 20, left: 0, right: 0, bottom: 0 },
      },
    },
    x: {
      ticks: {
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
      borderWidth: 1,
    },
  },
};

export const SpecimensByContinent = () => {
  return (
    <Box>
      <div>
        <Bar data={data} options={options} height={400} width={400} />
      </div>
    </Box>
  );
};

import React from "react";
import { Bar } from "react-chartjs-2";
import { speciesArr } from "../../../data/listArrays";
import anthroData from "../../../data/anthroData.json";
import { colorGenerator } from "../../helperFunctions";

function DataSetItem(data, fillBool, colorArray) {
  this.data = data;
  this.fillBool = fillBool;
  this.backgroundColor = colorArray[0];
  this.borderColor = colorArray[1];
}

const speciesCountObject = () => {
  const colorArray = colorGenerator(speciesArr.length, 0.2, 1);
  const resultObject = {};
  anthroData.forEach((item) => {
    const currentSpecies = item.species;
    if (resultObject[currentSpecies]) {
      resultObject[currentSpecies] += 1;
    } else {
      resultObject[currentSpecies] = 1;
    }
  });
  const dataArray = [];

  for (const prop of speciesArr) {
    dataArray.push(resultObject[prop]);
  }
  return new DataSetItem(dataArray, false, colorArray);
};

// const image = new Image();
// image.src = oasis;

// const bgImage = {
//   id: "custom_canvas_background_image",
//   beforeDraw: (chart) => {
//     if (image.complete) {
//       const ctx = chart.ctx;
//       const { top, left, width, height } = chart.chartArea;
//       const x = left + width / 2 - image.width / 2;
//       const y = top + height / 2 - image.height / 2;
//       ctx.drawImage(image, x, y);
//     } else {
//       image.onload = () => chart.draw();
//     }
//   },
// };

const data = {
  labels: speciesArr,
  datasets: [speciesCountObject()],
};
const options = {
  indexAxis: "y",
  plugins: {
    title: {
      display: true,
      align: "left",
      text: "Specimens By Species",
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
        display: false,
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
      borderWidth: 1,
    },
  },
};

export const SpecimensBySpecies = () => {
  return (
    <div>
      <Bar data={data} options={options} height={400} width={400} />
    </div>
  );
};

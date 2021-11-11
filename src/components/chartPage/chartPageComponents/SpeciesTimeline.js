import React from "react";
import { Box } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import {
  datesCategoryObj,
  datesCategoryProps,
  speciesArr,
} from "../../../data/listArrays";
import speciesArrays from "../../../data/speciesArrays.json";
const labels = (number) => {
  return datesCategoryProps.map((item) => {
    if (number) return datesCategoryObj[item].lesser;
    return datesCategoryObj[item].lesser.toString();
  });
};

function DataSetItem(label, data, fillBool, bgColor, borderColor) {
  this.label = label;
  this.data = data;
  this.fillBool = fillBool;
  this.backgroundColor = bgColor;
  this.borderColor = borderColor;
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

const dataSetCreator = () => {
  const labelsArr = labels(true);
  const colorArray = colorGenerator(labelsArr.length);

  const mid = Math.floor((labelsArr.length - 1) / 2);
  const quad = Math.floor((labelsArr.length - 1) / 4);
  return speciesArr.map((item, index) => {
    const dataObject = {};
    const comparatorMain = (date) => {
      return function comparator(currentIndex) {
        if (currentIndex === 1 || currentIndex === labelsArr.length - 2) {
          const prop =
            currentIndex === 1
              ? labelsArr[currentIndex - 1]
              : labelsArr[currentIndex];
          if (dataObject[prop]) {
            dataObject[prop] += 1;
          } else {
            dataObject[prop] = 1;
          }
          return;
        }
        const between =
          labelsArr[currentIndex - 1] > date && date >= labelsArr[currentIndex];
        if (between) {
          const prop = labelsArr[currentIndex];
          if (dataObject[prop]) {
            dataObject[prop] += 1;
          } else {
            dataObject[prop] = 1;
          }
          return;
        }
        if (currentIndex !== mid) {
          labelsArr[currentIndex] > date
            ? comparator(currentIndex + 1, date)
            : comparator(currentIndex - 1, date);
        } else {
          labelsArr[currentIndex] > date
            ? comparator(mid + quad, date)
            : comparator(mid - quad, date);
        }
      };
    };
    for (let element of speciesArrays[item]) {
      let date = element.wholeNumberYears;
      comparatorMain(date)(mid);
    }
    return new DataSetItem(
      item,
      dataObject,
      false,
      colorArray[index],
      colorArray[index]
    );
  });
};

const dataSetsArray = dataSetCreator();
const labelsArr = labels();
labelsArr.unshift("");
labelsArr.pop();
labelsArr.push("present");

const data = {
  labels: labelsArr,
  datasets: dataSetsArray,
};

const options = {
  plugins: {
    title: {
      display: true,
      align: "left",
      text: "Specimens By Timeline",
      font: {
        size: 40,
        weight: "bold",
      },
    },
  },
  layout: {
    padding: { top: 20, left: 0, right: 0, bottom: 0 },
  },
  animation: {
    easing: "linear",
    duration: 2000,
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
        text: "Timeline in Years",
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
    point: {
      radius: 10,
      pointStyle: "star",
      borderWidth: 5,
    },
    line: {
      tension: 0.5,
      borderWidth: 5,
    },
  },
};

export const SpeciesTimeline = () => {
  return (
    <Box mb={10} pt={4}>
      <div>
        <Line data={data} options={options} height={400} width={400} />
      </div>
    </Box>
  );
};

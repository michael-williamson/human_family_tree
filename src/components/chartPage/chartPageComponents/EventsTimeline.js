import React from "react";
import { Box } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { colorGenerator } from "../../helperFunctions";
import events from "../../../data/events.json";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { eventIconObject } from "../../../data/listArrays";
import { externalTooltipHandler } from "../helperFunctions/externalTooltip";

const labels = () => {
  const labelsArr = events.map((item) => {
    return parseInt(item.wholeNumberYears);
  });
  labelsArr
    .sort(function compareNumbers(a, b) {
      return a - b;
    })
    .reverse();
  return labelsArr;
};

const labelsArr = labels();

function DataSetItem(label, data, fillBool, bgColor, borderColor) {
  this.label = label;
  this.data = data;
  this.fillBool = fillBool;
  this.backgroundColor = bgColor;
  this.borderColor = borderColor;
}

const labelCreator = () => {
  const length = labelsArr.length;
  const dataArray = [];
  dataArray.fill(0, length);
  events.forEach((item) => {
    const index = labelsArr.indexOf(item.wholeNumberYears);
    dataArray[index] = item.date;
  });
  return dataArray;
};

const dataSetCreator = () => {
  const length = labelsArr.length;
  const colorArray = colorGenerator(labelsArr.length, 0.2, 1);
  let iconPositionFlipper = true;
  const mid = Math.floor((labelsArr.length - 1) / 2);
  const quad = Math.floor((labelsArr.length - 1) / 4);
  return events.map((item, index) => {
    const dataArray = [];
    dataArray.fill(0, length);
    const comparatorMain = (date) => {
      return function comparator(currentIndex) {
        if (currentIndex === 0 || currentIndex === labelsArr.length - 1) {
          dataArray[currentIndex] = iconPositionFlipper
            ? Math.random() + 1
            : Math.random();
          iconPositionFlipper = !iconPositionFlipper;
          return;
        }
        const between =
          labelsArr[currentIndex - 1] > date && date >= labelsArr[currentIndex];
        if (between) {
          dataArray[currentIndex] = iconPositionFlipper
            ? Math.random() + 1
            : Math.random();
          iconPositionFlipper = !iconPositionFlipper;
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

    let date = item.wholeNumberYears;

    comparatorMain(date)(mid);

    return new DataSetItem(
      item.eventName,
      dataArray,
      false,
      colorArray[0][index],
      colorArray[1][index]
    );
  });
};

const dataSetsArray = dataSetCreator();

const data = {
  labels: labelCreator(),
  datasets: dataSetsArray,
};

const imgReturn = (prop) => {
  const image = new Image();
  const label = prop.dataset.label;
  image.src = eventIconObject[label];
  return image;
};

const canvasBackground = {
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#e6f7e6";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

const options = {
  plugins: {
    tooltip: {
      enabled: false,
      position: "nearest",
      external: externalTooltipHandler,
    },
    datalabels: {
      color: "black",
      padding: { top: 10, left: 10, right: 10, bottom: 10 },
      // backgroundColor: "rgb(255 241 192 / 44%)",
      font: {
        size: 15,
        weight: "bold",
      },
      align: "top",
      offset: 20,
      formatter: function (value, context) {
        return context.chart.data.datasets[context.dataIndex].label;
      },
    },
    title: {
      // color: "#bc5829",
      color: "#646464",
      display: true,
      align: "left",
      text: "Timeline of Important Events",
      font: {
        size: 40,
        weight: "bold",
      },
      padding: { top: 0, left: 0, right: 0, bottom: 60 },
    },
    // subtitle: {
    //   display: true,
    //   text: "",
    //   align: "center",
    //   padding: { top: 0, left: 0, right: 0, bottom: 60 },
    //   font: {
    //     size: 20,
    //     weight: "bold",
    //   },
    // },
    legend: {
      display: false,
      labelsArr: {
        pointStyle: "star",
        usePointStyle: true,
      },
    },
  },
  layout: {
    padding: { top: 20, left: 100, right: 100, bottom: 0 },
  },
  animation: {
    easing: "linear",
    duration: 2000,
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,

        font: {
          size: 15,
          weight: "bold",
        },
      },
      suggestedMax: 2.5,
      beginAtZero: true,
    },
    x: {
      grid: {
        display: true,
        lineWidth: 2,
        color: "rgb(166 166 166 / 25%)",
      },
      ticks: {
        font: {
          size: 25,
          weight: "bold",
        },
        color: "#646464",

        padding: 10,
      },
      beginAtZero: true,
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
      pointStyle: imgReturn,
      borderWidth: 5,
    },
    line: {
      tension: 0.5,
      borderWidth: 5,
    },
  },
};

export const EventsTimeline = () => {
  return (
    <Box mb={10} pt={4}>
      <div>
        <Line
          data={data}
          options={options}
          plugins={[ChartDataLabels, canvasBackground]}
          height={400}
          width={400}
        />
      </div>
    </Box>
  );
};

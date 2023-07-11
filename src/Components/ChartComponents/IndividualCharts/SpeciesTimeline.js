import { Box } from "@mui/system";
import { Line } from "react-chartjs-2";
import { speciesArr } from "../../../HelperFunctions/General";
import {
  datesCategoryObj,
  datesCategoryProps,
} from "../../../HelperFunctions/ChartComponent/IndividualChartsComponents/SpeciesByTimeline/index";
import { colorGenerator } from "../../../HelperFunctions/ChartComponent";

const labels = number => {
  return datesCategoryProps.map(item => {
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

const dataSetCreator = objectBySpecies => {
  const labelsArr = labels(true);
  console.log(labelsArr, speciesArr, "what is?");
  const colorArray = colorGenerator(labelsArr.length, 0.2, 1);

  const mid = Math.floor((labelsArr.length - 1) / 2);
  const quad = Math.floor((labelsArr.length - 1) / 4);
  return speciesArr.map((item, index) => {
    const dataObject = {};
    const comparatorMain = date => {
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
    const arr = objectBySpecies[item] && objectBySpecies[item].itemsArr;
    if (Array.isArray(arr)) {
      for (let element of arr) {
        let date = element.wholeNumberYears;
        comparatorMain(date)(mid);
      }
    }

    return new DataSetItem(
      item,
      dataObject,
      false,
      colorArray[0][index],
      colorArray[1][index]
    );
  });
};

const chartAreaBorder = {
  id: "chartAreaBorder",
  beforeDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart;
    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  },
};

const options = {
  plugins: {
    title: {
      display: true,
      align: "left",
      text: "Timeline of Species",
      font: {
        size: 40,
        weight: "bold",
      },
    },
    legend: {
      display: true,
      labels: {
        padding: 20,
        pointStyle: "circle",
        usePointStyle: true,
        font: {
          size: 12,
          style: "italic",
        },
      },
    },
  },
  layout: {
    padding: { top: 20, left: 0, right: 0, bottom: 0 },
  },
  animation: {
    easing: "linear",
    duration: 1000,
  },
  scales: {
    y: {
      suggestedMax: 15,
      stepSize: 1,
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
      radius: 7,
      // pointStyle: "star",
      borderWidth: 3,
    },
    line: {
      tension: 0.5,
      borderWidth: 2,
    },
  },
};

export const SpeciesTimeline = ({ fetchArray, specimensObject = {} }) => {
  if (Object.keys(specimensObject).length <= 0) {
    return <Box>one moment...</Box>;
  }

  const dataSetsArray = dataSetCreator(specimensObject);
  const labelsArr = labels();
  labelsArr.unshift("");
  labelsArr.pop();
  labelsArr.push("present");

  const data = {
    labels: labelsArr,
    datasets: dataSetsArray,
  };

  return (
    <Box mb={10} pt={4}>
      <div>
        <Line
          data={data}
          options={options}
          plugins={[chartAreaBorder]}
          height={400}
          width={400}
        />
      </div>
    </Box>
  );
};

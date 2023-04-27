import React from "react";
import { Box } from "@mui/system";
// import { Line } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import events from "../../../Data/events.json";
// import {
//   labelsArray,
//   labelsSorterReverse,
//   labelsSorterReverseWithProps,
// } from "../../../HelperFunctions/ChartComponent/IndividualChartsComponents/index";
import { timeLineEventsChartMainContainer } from "../../../Styles/ChartComponentStyles/IndividualChartStyles/EventsTimelineStyles";

// const data = {
//   labels: labelsSorterReverse(
//     labelsArray(events, parseInt, "wholeNumberYears")
//   ),
//   datasets: [
//     {
//       label: labelsSorterReverseWithProps(events, "wholeNumberYears").map(
//         (item) => item.eventName
//       ),
//       data: Array(events.length)
//         .fill(1)
//         .map((item) => Math.random() * 2),
//     },
//   ],
// };

// const options = {
//   plugins: {
//     tooltip: {
//       enabled: false,
//       position: "nearest",
//     },
//     datalabels: {
//       color: "black",
//       padding: { top: 10, left: 10, right: 10, bottom: 10 },
//       font: {
//         size: 10,
//         weight: "bold",
//       },
//       align: "top",
//       offset: 20,
//       formatter: function (value, context) {
//         return context.chart.data.datasets[0].label[context.dataIndex];
//       },
//     },
//     title: {
//       color: "#646464",
//       display: true,
//       align: "left",
//       text: "Timeline of Important Events",
//       font: {
//         size: 40,
//         weight: "bold",
//       },
//       padding: { top: 0, left: 0, right: 0, bottom: 60 },
//     },
//     legend: {
//       display: false,
//       labelsArr: {
//         pointStyle: "star",
//         usePointStyle: true,
//       },
//     },
//   },
//   layout: {
//     padding: { top: 20, left: 0, right: 0, bottom: 0 },
//   },
//   animation: {
//     easing: "linear",
//     duration: 2000,
//   },
//   scales: {
//     y: {
//       grid: {
//         display: false,
//       },
//       ticks: {
//         display: false,

//         font: {
//           size: 5,
//           weight: "bold",
//         },
//       },
//       suggestedMax: 2.5,
//       beginAtZero: true,
//     },
//     x: {
//       grid: {
//         display: true,
//         lineWidth: 2,
//         color: "rgb(166 166 166 / 25%)",
//       },
//       ticks: {
//         font: {
//           size: 10,
//           weight: "bold",
//         },
//         color: "#646464",

//         padding: 10,
//       },
//       beginAtZero: true,
//       title: {
//         display: false,
//         text: "Timeline in Years",
//         font: {
//           size: 30,
//           weight: "bold",
//         },
//         padding: { top: 20, left: 0, right: 0, bottom: 0 },
//       },
//     },
//   },
//   maintainAspectRatio: false,
//   elements: {
//     point: {
//       radius: 10,
//       borderWidth: 5,
//     },
//     line: {
//       tension: 0.5,
//       borderWidth: 0,
//     },
//   },
// };

export const EventsTimeline = () => {
  return (
    <Box sx={timeLineEventsChartMainContainer}>
      <div>
        {/* <Line
          data={data}
          options={options}
          plugins={[ChartDataLabels]}
          height={400}
          width={400}
        /> */}
        updating
      </div>
    </Box>
  );
};

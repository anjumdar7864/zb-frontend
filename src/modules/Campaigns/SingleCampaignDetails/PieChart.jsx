import React from "react";
import { Chart } from "react-google-charts";

const PieChart = ({ data }) => {
  const chartData = [
    ["Status", "Value"],
    ...data.labels.map((label, index) => [label, data.datasets[0].data[index]]),
  ];
  const allZero = data.datasets[0].data.every((value) => value === 0);
  const displayData = allZero
    ? [
        ["Status", "Value"],
        ["No Data", 1],
      ]
    : chartData;
  const options = {
    chartArea: { width: "90%", height: "80%" },
    slices: allZero
      ? [{ color: "#d3d3d3" }]
      : data.datasets[0].backgroundColor.map((color) => ({
          color: color,
        })),
    legend: {
      position: "right",
   
      alignment: "center",
      textStyle: {
        fontSize: 14,
        color: "#333",
      },
    },
    tooltip: {
      text: "both",
    },
  };

  return (
    <div style={{ display:"flex" , alignItems:"center" }} >
      <Chart chartType="PieChart" data={displayData} options={options} />
    </div>
  );
};

export default PieChart;

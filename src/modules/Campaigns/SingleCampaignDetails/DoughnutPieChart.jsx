import React, { useState } from "react";
import { Chart } from "react-google-charts";

const DoughnutPieChart = ({ data , singleCampaign }) => {
  // Prepare data in the required format for Google Charts
  // const [sentPercentage , setSentPercentage] = useState()
  const chartData = [
    ["Status", "Value"],
    ...data.map((item) => [item.name, item.value]),
  ];

  
  // Calculate the total and sent percentage
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const sentValue = data[0]?.value || 0;
  // const sentPercentage = total ? ((sentValue / total) * 100).toFixed(2) : 0;
  // setSentPercentage( singleCampaign?.totalProspects ? ((singleCampaign?.sent / singleCampaign?.totalProspects) * 100).toFixed(2) : 0)

  // Options for Google Charts
  const options = {
    pieHole: 0.7, // For a doughnut chart effect
    slices: [
      { color: "#00BD82" }, // Color for "Sent Message"
      { color: "#D3D7DD" }, // Color for "Remaining"
    ],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        fontSize: 14,
        color: "#333",
      },
    },
    tooltip: {
      text: "percentage", // Display as percentage
    },
    pieSliceText: "none", // Hide slice text (use custom text in center instead)
    chartArea: {
      width: "90%",
      height: "60%",
    },
  };
  return (
    <div style={{ position: "relative", width: "300px", height: "300px" }}>
      {/* Render the Google Charts PieChart */}
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"100%"}
        height={"100%"}
      />
      {/* Custom center text overlay */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "14px",
          color: "#777777",
        }}
      >
        <div>Messages Sent</div>
        <div style={{ fontSize: "24px", fontWeight: "500", color: "black" }}>
          {/* {sentValue.toFixed(2)} */}
          {singleCampaign?.sentALL}
        </div>
        {/* <div style={{ fontSize: "12px", color: "#777777" }}>
          {sentPercentage}% Sent
        </div> */}
      </div>
    </div>
  );
};

export default DoughnutPieChart;

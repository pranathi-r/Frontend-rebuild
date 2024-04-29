import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export default function BarChart() {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        height: 400,
        type: "bar",
        offsetY: 16,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          distributed: true,
          barHeight: "85%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        position: "bottom",
        categories: [],
      },
      yaxis: {
        show: false,
      },
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      legend: {
        position: "top", // Set legend position to top
      },
      colors: [
        "#33b2df",
        "#546E7A",
        "#d4526e",
        "#13d8aa",
        "#A5978B",
        "#2b908f",
        "#f9a3a4",
        "#90ee7e",
        "#f48024",
        "#69d2e7",
      ],
    },
    series: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    getStudentdata();
  }, []);

  async function getStudentdata() {
    try {
      const response = await axios.get(
        "http://54.206.210.62:1337/fetchAllstudent"
      );
      const data = response.data;

      const departmentCounts = {};
      data.forEach((student) => {
        const department = student.department;
        departmentCounts[department] = (departmentCounts[department] || 0) + 1;
      });

      const categories = Object.keys(departmentCounts);
      const seriesData = categories.map(
        (category) => departmentCounts[category]
      );

      setChartData((prevData) => ({
        ...prevData,
        options: {
          ...prevData.options,
          xaxis: {
            ...prevData.options.xaxis,
            categories: categories,
          },
        },
        series: [{ data: seriesData }],
      }));
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  }

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      {/* Adjust width here */}
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={400}
        className="apex-charts"
        dir="ltr"
      />
    </div>
  );
}

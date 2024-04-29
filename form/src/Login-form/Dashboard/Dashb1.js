import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "./Sty.css";

function Dashb1() {
  const [departmentCount, setDepartmentCount] = useState([]);
  const [deptNames, setDeptNames] = useState([]);
  const [clickedData, setClickedData] = useState(null);
  const [teacherNames, setTeacherNames] = useState([]);
  const [coloors, setcoloors] = useState([]);
  console.log(coloors);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await fetch(
          "http://54.206.210.62:1337/teacher"
        );
        const teacherData = await teacherResponse.json();

        const departmentCountObj = {};
        teacherData.forEach((teacher) => {
          const department = teacher.designation;
          departmentCountObj[department] =
            (departmentCountObj[department] || 0) + 1;
        });

        const departmentCounts = Object.values(departmentCountObj);
        const departmentNames = Object.keys(departmentCountObj);

        setDepartmentCount(departmentCounts);
        setDeptNames(departmentNames);
        console.log("Teacher data fetched:", departmentCounts, departmentNames);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDataPointSelection = async (event, chartContext, config) => {
    const selectedDesignation = config.w.config.labels[config.dataPointIndex];
    console.log("Selected Designation:", selectedDesignation);
    setClickedData(selectedDesignation); // Update clickedData when a data point is selected

    try {
      const response = await axios.get(
        `http://54.206.210.62:1337/teacherFind/byDesignation?designation=${selectedDesignation}`
      );

      const data = response.data;
      console.log("Fetched Students:", data);
      setTeacherNames(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const closePopup = () => {
    setTeacherNames([]); // Clear the teacherNames state to close the popup
  };

  console.log("Rendering chart with data:", departmentCount, deptNames);

  return (
    <React.Fragment>
      {departmentCount.length > 0 && (
        <div>
          <Chart
            type="pie"
            width={900}
            height={300}
            series={departmentCount}
            options={{
              noData: { text: "Empty Data" },
              labels: deptNames,
              legend: {
                position: "top",
              },
              chart: {
                events: {
                  dataPointSelection: handleDataPointSelection,
                },
              },
            }}
          />
        </div>
      )}

      {teacherNames.length > 0 && (
        <div className="custom-popup-overlay">
          <div className="custom-popup">
            <div className="custom-popup-header">
              <h3>{clickedData}</h3>
              <button className="close-button" onClick={closePopup}>
                &times;
              </button>
            </div>
            <div className="custom-popup-body">
              <ul>
                {teacherNames.map((student, index) => (
                  <li key={index}>{student}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Dashb1;

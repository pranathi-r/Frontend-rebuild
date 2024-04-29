import React, { useState, useEffect } from "react";
import Sty from "./Sty.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Dashb1 from "./Dashb1";
import BarChart from "./BarChart";
function Dashb() {
  return (
    <div className="bordered-content">
      <div className="inner">
        <span className="para">Dashboard </span>
      </div>

      <div className="division">
        <div class="pie">
          <Dashb1 />
        </div>
        <div className="bar">
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default Dashb;

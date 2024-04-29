// import React, { useState } from "react";
// import "./Success.css";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import SettingsIcon from "@mui/icons-material/Settings";
// import school from "../images/sh.png";
// import { Link, Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// export const LogInSuccessfull = () => {
//   const navigate = useNavigate();
//   const [isDashboardOpen, setIsDashboardOpen] = useState(false);
//   const [showLogout, setShowLogout] = useState(false);

//   const handleSettingsClick = () => {
//     setShowLogout((prevShowLogout) => !prevShowLogout);
//   };

//   const toggleDashboard = () => {
//     setIsDashboardOpen((prevIsOpen) => !prevIsOpen);
//   };

//   const logout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="over">
//       <div className={`dash ${isDashboardOpen ? "open" : ""}`}>
//         <div className="top-bar">
//           <MenuOutlinedIcon className="icon" onClick={toggleDashboard} />
//           <img src={school} alt="School" className="img" />
//           <SettingsIcon className="setting" onClick={handleSettingsClick} />
//         </div>
//         <div className="dashboard-content">
//           <ul className="Links">
//             <li>
//               <Link className="nav-link" to="/logInSuccess/dashboard">
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link className="nav-link" to="/logInSuccess/teacher">
//                 Teacher
//               </Link>
//             </li>
//             <li>
//               <Link className="nav-link" to="/logInSuccess/student">
//                 Student
//               </Link>
//             </li>
//           </ul>
//         </div>
//         {showLogout && (
//           <div className="logout-dropdown">
//             <button
//               onClick={() => {
//                 logout();
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         )}
//         <div className="content-wrapper">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogInSuccessfull;

// import React, { useState,useEffect } from "react";
// import "./Success.css";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import SettingsIcon from "@mui/icons-material/Settings";
// import school from "../images/sh.png";
// import { Link, Outlet, useLocation } from "react-router-dom"; // Import useLocation
// import { useNavigate } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import PersonIcon from "@mui/icons-material/Person";

// import axios from "axios";
// export const LogInSuccessfull = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); // Initialize useLocation
//   const [isDashboardOpen, setIsDashboardOpen] = useState(false);
//   const [showLogout, setShowLogout] = useState(false);

//   const handleSettingsClick = () => {
//     setShowLogout((prevShowLogout) => !prevShowLogout);
//   };

//   const toggleDashboard = () => {
//     setIsDashboardOpen((prevIsOpen) => !prevIsOpen);
//   };

//   const logout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="over">
//       <div className={`dash ${isDashboardOpen ? "open" : ""}`}>
//         <div className="top-bar">
//           <MenuOutlinedIcon className="icon" onClick={toggleDashboard} />
//           <img src={school} alt="School" className="img" />
//           <SettingsIcon className="setting" onClick={handleSettingsClick} />
//         </div>
//         <div className="dashboard-content">
//           <ul className="Links">
//             <li>
//               <Link
//                 className={`nav-link ${
//                   location.pathname === "/logInSuccess/dashboard"
//                     ? "active"
//                     : ""
//                 }`}
//                 to="/logInSuccess/dashboard"
//               >
//                 <DashboardIcon className="icon" />
//                 <span className="link-text">Dashboard</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 className={`nav-link ${
//                   location.pathname === "/logInSuccess/teacher" ? "active" : ""
//                 }`}
//                 to="/logInSuccess/teacher"
//               >
//                 <SupervisorAccountIcon className="icon" />
//                 <span className="link-text">Teacher</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 className={`nav-link ${
//                   location.pathname === "/logInSuccess/student" ? "active" : ""
//                 }`}
//                 to="/logInSuccess/student"
//               >
//                 <PersonIcon className="icon" />
//                 <span className="link-text">Student</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//         {showLogout && (
//           <div className="logout-dropdown">
//             <button
//               onClick={() => {
//                 logout();
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         )}
//         <div className="content-wrapper">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogInSuccessfull;

import React, { useState, useEffect } from "react";
import "./Success.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import school from "../images/sh.png";
import { Link, Outlet, useLocation } from "react-router-dom"; // Import useLocation
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

export const LogInSuccessfull = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Initialize useLocation
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleSettingsClick = () => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  };

  const toggleDashboard = () => {
    setIsDashboardOpen((prevIsOpen) => !prevIsOpen);
  };

  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("id");
    console.log(userId);

    // Fetch user details using the user ID
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://54.206.210.62:1337/findUser/${userId}`
        );

        console.log(response.data.signUpUsername);
        setUserData(response.data.signUpUsername);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [location.search]);

  return (
    <div className="over">
      <div className={`dash ${isDashboardOpen ? "open" : ""}`}>
        <div className="top-bar">
          <MenuOutlinedIcon className="icon" onClick={toggleDashboard} />
          <img src={school} alt="School" className="img" />
          <SettingsIcon className="setting" onClick={handleSettingsClick} />
          <h3 className="welcome">Welcome, {userData}!</h3>
        </div>
        <div className="dashboard-content">
          <ul className="Links">
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/logInSuccess/dashboard"
                    ? "active"
                    : ""
                }`}
                to="/logInSuccess/dashboard"
              >
                <DashboardIcon className="icon" />
                <span className="link-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/logInSuccess/teacher" ? "active" : ""
                }`}
                to="/logInSuccess/teacher"
              >
                <SupervisorAccountIcon className="icon" />
                <span className="link-text">Teacher</span>
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${
                  location.pathname === "/logInSuccess/student" ? "active" : ""
                }`}
                to="/logInSuccess/student"
              >
                <PersonIcon className="icon" />
                <span className="link-text">Student</span>
              </Link>
            </li>
          </ul>
        </div>
        {showLogout && (
          <div className="logout-dropdown">
            <button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        )}

        {/* {userData ? (
          <h1>Welcome, {userData}!</h1>
        ) : (
          <h1>Loading user data...</h1>
        )} */}
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LogInSuccessfull;

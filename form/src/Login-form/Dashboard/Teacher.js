import React, { useState, useEffect } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Drawer from "@mui/material/Drawer";
import AddTeacherForm from "./AddTeacherForm";
import axios from "axios";
import bg from "../../images/bg.jpeg";
import Stu from "./Stu.css";

import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserIcon from "@mui/icons-material/AccountCircle";
import "./Sty.css";

function Teacher() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [teacherData, setTeacherData] = useState([]);
  const [editTeacher, setEditTeacher] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [hoveredTeacher, setHoveredTeacher] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setEditTeacher(null);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    toggleDrawer();
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://54.206.210.62:1337/teacher");
      setTeacherData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setTeacherToDelete(id);
    setShowDeletePrompt(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeletePrompt(false);
    try {
      await axios.delete(`http://54.206.210.62:1337/del/${teacherToDelete}`);
      const updatedData = teacherData.filter(
        (teacher) => teacher.id !== teacherToDelete
      );
      setTeacherData(updatedData);
      console.log("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePrompt(false);
  };

  const handleEdit = (id) => {
    setIsDrawerOpen(true);
    setEditTeacher(id);
  };

  const handleSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  const handleHoverTeacher = async (id) => {
    try {
      const response = await axios.get(
        `http://54.206.210.62:1337/findDegree/${id}`
      );
      setHoveredTeacher({
        id: id,
        degree: response.data.degree,
        designation: response.data.designation,
      });
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    }
  };

  const ConfirmDeletePrompt = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="confirm-delete-prompt">
        <p>Are you sure you want to delete this teacher?</p>
        <div className="button-container">
          <button onClick={onConfirm} className="confirm-button">
            Yes
          </button>
          <button onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const handleInputChange = async (event) => {
    setSearchValue(event.target.value); // Update the search value

    try {
      const response = await axios.get(
        `http://54.206.210.62:1337/filterTeachers/filter?value=${event.target.value}`
      );
      setTeacherData(response.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  return (
    <div className="bordered-content">
      <ConfirmDeletePrompt
        isOpen={showDeletePrompt}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        className="deletePrompt"
      />

      <div className="inner">
        <p className="para">Teacher</p>
      </div>

      <button className="tbutton" onClick={toggleDrawer}>
        <PersonAddAltIcon style={{ color: "white" }} />
        <span style={{ color: "white" }}>Add Teacher</span>
      </button>

      {successMessage && (
        <div className="custom-snackbar">
          {successMessage}
          <span className="tick-mark">&#10003;</span>
        </div>
      )}

      <TextField
        label="Search"
        variant="outlined"
        value={searchValue}
        onChange={handleInputChange}
        style={{ marginTop: "-50px", width: "180px" }}
      />

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{ sx: { width: "50vw", backgroundImage: `url(${bg})` } }}
      >
        <div className="drawer-content">
          <AddTeacherForm
            teacher={editTeacher}
            closeDrawer={handleDrawerClose}
            fetchData={fetchData}
            onSuccess={handleSuccessMessage} // Pass fetchData function
          />
        </div>
      </Drawer>

      <div className="teacher-data">
        <div className="table-container">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Profile</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teacherData.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <IconButton
                        onMouseEnter={() => handleHoverTeacher(teacher.id)}
                        onMouseLeave={() => setHoveredTeacher(null)}
                      >
                        <UserIcon />
                      </IconButton>
                      {hoveredTeacher && hoveredTeacher.id === teacher.id && (
                        <div className="tooltip active">
                          <p>Degree: {hoveredTeacher.degree}</p>
                          <p>Designation: {hoveredTeacher.designation}</p>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.department}</TableCell>
                    <TableCell>{teacher.experience}</TableCell>
                    <TableCell>{teacher.gender}</TableCell>
                    <TableCell>{teacher.designation}</TableCell>
                    <TableCell>{teacher.country}</TableCell>
                    <TableCell>
                      <button
                        className="aicon"
                        onClick={() => {
                          handleEdit(teacher.id);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="aicond"
                        onClick={() => handleDelete(teacher.id)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Teacher;

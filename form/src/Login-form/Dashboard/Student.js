import React, { useState, useEffect } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Drawer from "@mui/material/Drawer";
import AddStudentForm from "./AddStudentForm";
import axios from "axios";
import Stu from "./Stu.css";
import bg from "../../images/bg.jpeg";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserIcon from "@mui/icons-material/AccountCircle";
import "./Sty.css";
function BacklogStudentsPrompt({ backlogStudents, onClose }) {
  return (
    <div className="backlog-students-prompt">
      <p>Backlog Students:</p>
      <ul>
        {backlogStudents.map((student, index) => (
          <li key={index} className="li">
            {student}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

function Student() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [flag, setFlag] = useState();
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [backlogStudents, setBacklogStudents] = useState([]);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setEditStudent(null);
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
      const response = await axios.get(
        "http://54.206.210.62:1337/fetchAllstudent"
      );
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setStudentToDelete(id);
    setShowDeletePrompt(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeletePrompt(false);
    try {
      await axios.delete(
        `http://54.206.210.62:1337/delStudent/${studentToDelete}`
      );
      const updatedData = studentData.filter(
        (student) => student.id !== studentToDelete
      );
      setStudentData(updatedData);
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
    setEditStudent(id);
  };

  const handleSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  const handleFlag = (flag) => {
    setFlag(flag);
  };

  const ConfirmDeletePrompt = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="confirm-delete-prompt">
        <p>Are you sure you want to delete this student?</p>
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

  const handleFetchBacklogStudents = async () => {
    try {
      const response = await axios.get(
        "http://54.206.210.62:1337/studentBacklog"
      );
      const backlogStudents = response.data.map((student) => student.name);

      setBacklogStudents(backlogStudents);
      console.log("Backlog students fetched successfully:", backlogStudents);
    } catch (error) {
      console.error("Error fetching backlog students:", error);
    }
  };

  return (
    <div className="bordered-content">
      {backlogStudents.length > 0 && (
        <BacklogStudentsPrompt
          backlogStudents={backlogStudents}
          onClose={() => setBacklogStudents([])}
        />
      )}
      <ConfirmDeletePrompt
        isOpen={showDeletePrompt}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        className="deletePrompt"
      />
      <div className="inner">
        <p className="para">Student</p>
      </div>
      <button className="backlog" onClick={handleFetchBacklogStudents}>
        Backlogs Students
      </button>

      <button className="tbutton" onClick={toggleDrawer}>
        <PersonAddAltIcon style={{ color: "white" }} />
        <span style={{ color: "white" }}>Add Student</span>
      </button>

      {successMessage && flag ? (
        <div className="custom-snackbar">
          {successMessage}
          <span className="tick-mark">&#10003;</span>
        </div>
      ) : (
        <div className="custom-snackbar-danger">{successMessage}</div>
      )}

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{ sx: { width: "50vw", backgroundImage: `url(${bg})` } }}
      >
        <div className="drawer-content">
          <AddStudentForm
            onSubmit={handleFormSubmit}
            student={editStudent}
            closeDrawer={handleDrawerClose}
            fetchData={fetchData}
            onSuccess={handleSuccessMessage}
            onFlag={handleFlag} // Pass fetchData function
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
                  <TableCell>Usn</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>GPA</TableCell>
                  <TableCell>Year of Study</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <IconButton>
                        <UserIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{student.usn}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.gpa}</TableCell>
                    <TableCell>{student.yearofstudy}</TableCell>
                    <TableCell>
                      <button
                        className="aicon"
                        onClick={() => {
                          handleEdit(student.id);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="aicond"
                        onClick={() => handleDelete(student.id)}
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

export default Student;

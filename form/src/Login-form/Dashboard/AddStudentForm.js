// AddStudentForm.js
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, Grid, Snackbar } from "@mui/material";
import * as Yup from "yup"; // Import Yup for form validation
import axios from "axios";

const validationSchema = Yup.object().shape({
  usn: Yup.string()
    .required("USN is required")
    .typeError("GPA must be a number"),
  name: Yup.string().required("Name is required"),
  department: Yup.string().required("Department is required"),
  gender: Yup.string()
    .required("Gender is required")
    .matches(
      /^(male|female)$/i,
      "Invalid gender. Please enter 'male' or 'female'."
    ),
  gpa: Yup.number()
    .typeError("GPA must be a number")
    .required("GPA is required")
    .min(1, "GPA must be greater than 0"),
  yearofstudy: Yup.number()
    .typeError("Year of Study must be a number")
    .required("Year of Study is required")
    .min(1, "Year of Study must be greater than 0")
    .max(4, "Year of Study must be less than or equal to 4"),
  backlogs: Yup.number()
    .typeError("Backlogs must be a number")
    .required("Backlogs is required"),
});

const AddStudentForm = ({
  student,
  closeDrawer,
  fetchData,
  onSuccess,
  onFlag,
}) => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://54.206.210.62:1337/findOneStudent/${student}`
        );
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (student) {
      fetchData();
    }
  }, [student]);

  const formik = useFormik({
    initialValues: {
      usn: "",
      name: "",
      department: "",
      gender: "",
      gpa: "",
      yearofstudy: "",
      backlogs: "",
      ...studentData, // Prepopulate form with fetched data
    },
    enableReinitialize: true, // Allow form reinitialization with new initialValues
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (student) {
          await axios.put(
            `http://54.206.210.62:1337/updateStudent/${student}`,
            values
          );
          onSuccess("Student updated successfully");
          onFlag(true);
        } else {
          await axios.post("http://54.206.210.62:1337/creating", values);
          onSuccess("Student added successfully");
          onFlag(true);
        }
        closeDrawer();
        fetchData(); // Fetch updated data after submission
      } catch (error) {
        console.error("Error:", error);
        const errorData = error.response.data;

        // Convert object values to an array and join them into a string
        const errorDataString = Object.values(errorData).join(" ");

        onSuccess(errorDataString);
        onFlag(false);
      }
      setSubmitting(false);
    },
  });

  return (
    <div style={{ margin: "20px" }}>
      <form onSubmit={formik.handleSubmit}>
        <span
          style={{
            fontFamily: "system-ui",
            marginLeft: "-500px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {student ? "Edit Student" : "Add Student"}
        </span>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="USN"
              name="usn"
              value={formik.values.usn}
              onChange={formik.handleChange}
              onFocus={formik.handleBlur}
              error={formik.touched.usn && Boolean(formik.errors.usn)}
              helperText={formik.touched.usn && formik.errors.usn}
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "20px",
                width: "200px",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onFocus={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "20px",
                width: "200px",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onFocus={formik.handleBlur}
              error={
                formik.touched.department && Boolean(formik.errors.department)
              }
              helperText={formik.touched.department && formik.errors.department}
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "20px",
                width: "200px",
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onFocus={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "20px",
                width: "200px",
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="GPA"
              name="gpa"
              value={formik.values.gpa}
              onChange={formik.handleChange}
              onFocus={formik.handleBlur}
              error={formik.touched.gpa && Boolean(formik.errors.gpa)}
              helperText={formik.touched.gpa && formik.errors.gpa}
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "20px",
                width: "200px",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="YearOfStudy"
              name="yearofstudy"
              value={formik.values.yearofstudy}
              onChange={formik.handleChange}
              onFocus={formik.handleBlur}
              error={
                formik.touched.yearofstudy && Boolean(formik.errors.yearofstudy)
              }
              helperText={
                formik.touched.yearofstudy && formik.errors.yearofstudy
              }
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "20px",
                width: "200px",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Number-Of-Backlogs"
              name="backlogs"
              value={formik.values.backlogs}
              onChange={formik.handleChange}
              onFocus={formik.handleBlur}
              error={formik.touched.backlogs && Boolean(formik.errors.backlogs)}
              helperText={formik.touched.backlogs && formik.errors.backlogs}
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "20px",
                width: "200px",
              }}
            />
          </Grid>
        </Grid>
        {student ? (
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "40px", backgroundColor: "#3F52B8" }}
          >
            Update
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "40px", backgroundColor: "#3F52B8" }}
          >
            Add
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddStudentForm;

// AddTeacherForm.js
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, Grid } from "@mui/material";
import * as Yup from "yup"; // Import Yup for form validation
import axios from "axios";
import bg from "../../images/bg.jpeg";
import "./Sty.css";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  department: Yup.string().required("Department is required"),
  gender: Yup.string()
    .required("Gender is required")
    .matches(
      /^(male|female)$/i,
      "Invalid gender. Please enter 'male' or 'female'."
    ),
  experience: Yup.string()
    .typeError("Experience must be a number")
    .required("Experience is required")
    .min(1, "Experience must be greater than 0"),
  designation: Yup.string().required("Designation is required"),
  degree: Yup.string().required("Degree is required"),

  country: Yup.string().required("Country is required"),
});

const AddTeacherForm = ({ teacher, closeDrawer, fetchData, onSuccess }) => {
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://54.206.210.62:1337/find/${teacher}`
        );
        setTeacherData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (teacher) {
      fetchData();
    }
  }, [teacher]);

  const formik = useFormik({
    initialValues: {
      name: "",
      department: "",
      gender: "",
      experience: "",
      designation: "",
      degree: "",
      country: "",
      ...teacherData, // Prepopulate form with fetched data
    },
    enableReinitialize: true, // Allow form reinitialization with new initialValues
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (teacher) {
          await axios.put(
            `http://54.206.210.62:1337/update/${teacher}`,
            values
          );
          onSuccess("Teacher updated successfully");
        } else {
          await axios.post("http://54.206.210.62:1337/create", values);
          onSuccess("Teacher added successfully");
        }
        closeDrawer();
        fetchData(); // Fetch updated data after submission
      } catch (error) {
        console.error("Error:", error);
        onSuccess(error);
      }
      setSubmitting(false);
    },
  });

  return (
    <div
      style={{
        margin: "20px",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <span
          style={{
            fontFamily: "system-ui",
            marginLeft: "-500px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {teacher ? "Edit Teacher" : "Add Teacher"}
        </span>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
              onFocus={formik.handleBlur}
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
              onBlur={formik.handleBlur}
              onFocus={formik.handleBlur}
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "20px",
                width: "200px",
              }}
              error={
                formik.touched.department && Boolean(formik.errors.department)
              }
              helperText={formik.touched.department && formik.errors.department}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Experience"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={formik.handleBlur}
              error={
                formik.touched.experience && Boolean(formik.errors.experience)
              }
              helperText={formik.touched.experience && formik.errors.experience}
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
              onBlur={formik.handleBlur}
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
              label="Designation"
              name="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={formik.handleBlur}
              error={
                formik.touched.designation && Boolean(formik.errors.designation)
              }
              helperText={
                formik.touched.designation && formik.errors.designation
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
              label="Degree"
              name="degree"
              value={formik.values.degree}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={formik.handleBlur}
              error={formik.touched.degree && Boolean(formik.errors.degree)}
              helperText={formik.touched.degree && formik.errors.degree}
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
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onFocus={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                marginTop: "20px",
                width: "200px",
              }}
            />
          </Grid>
        </Grid>
        {teacher ? (
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

export default AddTeacherForm;

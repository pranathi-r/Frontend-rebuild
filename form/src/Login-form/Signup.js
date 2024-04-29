import log from "../images/log.svg";
import register from "../images/register.svg";
import React, { useState } from "react";
import "./Styles.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValuesSignUp = {
  signUpUsername: "",
  signUpPassword: "",
  signUpconfirmPassword: "",
};

const onSubmit = (navigate) => async (values) => {
  try {
    console.log("Form data", values.signUpUsername, values.signUpPassword);

    const response = await axios.post("http://54.206.210.62:1337/signup", {
      signUpUsername: values.signUpUsername,
      signUpPassword: values.signUpPassword,
    });

    console.log(response.data);
    navigate("/signin");
  } catch (error) {
    console.error("Error:", error.response.data.error);
    alert(error.response.data.error); // Alert the error message from the backend
  }
};

const validationSchema = Yup.object({
  signUpUsername: Yup.string().required(" Username is required"),
  signUpPassword: Yup.string()
    .required(" Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
      "Password must contain atleast one capital,small,number and a special character"
    ),

  signUpconfirmPassword: Yup.string()
    .oneOf([Yup.ref("signUpPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState("");

  const handleSignUpClick = () => {
    setIsSignUpMode("sign-up-mode");
    console.log("signup");
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <Formik
            initialValues={initialValuesSignUp}
            validationSchema={validationSchema}
            onSubmit={onSubmit(navigate)}
          >
            <Form className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <Field
                  type="text"
                  name="signUpUsername"
                  placeholder="Username"
                />
                <ErrorMessage
                  name="signUpUsername"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <Field
                  type="password"
                  name="signUpPassword"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="signUpPassword"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <Field
                  type="password"
                  name="signUpconfirmPassword"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="signUpconfirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>
              <button type="submit" className="btn solid">
                Sign up
              </button>
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </Form>
          </Formik>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Don't have an account? Sign up</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={handleSignUpClick}
            >
              Sign up
            </button>
          </div>
          <img src={log} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Already have an account? Sign in</p>
            <button
              className="btn transparent"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </button>
          </div>
          <img src={register} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Signup;

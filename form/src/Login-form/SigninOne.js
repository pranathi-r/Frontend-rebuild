import log from "../images/log.svg";
import register from "../images/register.svg";
import React, { useState } from "react";
import "./Styles.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValuesSignIn = {
  username: "",
  password: "",
};

const onSubmitnext = (navigate) => (values) => {
  console.log("Form data", values.username, values.password);
  axios
    .post("http://54.206.210.62:1337/signin", {
      username: values.username,
      password: values.password,
    })
    .then((response) => {
      console.log(response.data);
      const uid = response.data.user.id;
      console.log(uid);
      navigate(`/logInSuccess?id=${uid}`); // Handle successful sign-in response
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Invalid credentials. Please try again."); // Handle sign-in error
    });
};

const signinvalidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const SigninOne = () => {
  const navigate = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState("");

  const handleSignUpClick = () => {
    setIsSignUpMode("sign-up-mode");
  };
  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/*Sign in */}
          <Formik
            initialValues={initialValuesSignIn}
            onSubmit={onSubmitnext(navigate)}
            validationSchema={signinvalidationSchema}
          >
            <Form className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <Field type="text" name="username" placeholder="Username" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
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
          {/* <div className="content">
            <h3>New here ?</h3>
            <p>Don't have an account? Sign up</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => navigate("/")}
            >
              Sign up
            </button>
          </div> */}
          <img src={log} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SigninOne;

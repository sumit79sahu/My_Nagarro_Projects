import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextBox from "../Component/Inputs/TextBox";
import { Button } from "react-bootstrap";
import "../Assets/styles/Layout/Signup.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signupShow } from "../Store/Signup/signupSlice";
import Modal from "react-bootstrap/Modal";
import FormImage from "../Component/Background/FormImage";
import { loginShow } from "../Store/Login/loginSlice";
import { CloseButton } from "react-bootstrap";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

import { emailVerificationShow } from "../Store/Verification/EmailVerification";
export default function Signup() {
  const signup = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const openLogin = () => {
    dispatch(signupShow(false));
    dispatch(loginShow(true));
  };
  const signUp = async (values, { resetForm, setFieldError }) => {
    try {
      const result = await fetch("http://localhost:3000/api/signup", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });
      const response = await result.json();
      if (response.message === "UsernameExistsException")
        setFieldError("email", "this email already exists");
      if (response.message === "success") {
        resetForm();
        dispatch(
          emailVerificationShow({
            email: values.email,
            verificationShow: true,
            successShow: false,
            failShow: false,
          })
        );
        dispatch(signupShow(false));
      }
    } catch (error) {
      setError(true);
    }
  };
  if (error)
    return (
      <div className="wrong">
        <span> Something went wrong </span>
      </div>
    );
  return (
    <>
      <Modal
        show={signup}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="signup-container">
            <div className="signup-form">
              <h3>Sign Up</h3>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmpassword: "",
                }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Required"),
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                  password: Yup.string()
                    .required("Required")
                    .min(8, "Password must be 8 characters long")
                    .matches(/[0-9]/, "Password requires a number")
                    .matches(/[a-z]/, "Password requires a lowercase letter")
                    .matches(/[A-Z]/, "Password requires an uppercase letter")
                    .matches(/[^\w]/, "Password requires a symbol"),
                  confirmpassword: Yup.string()
                    .required("Required")
                    .oneOf(
                      [Yup.ref("password"), null],
                      `Confirm Password Doesn't match`
                    ),
                })}
                onSubmit={(values, props) => {
                  props.setSubmitting(true);
                  signUp(values, props);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <TextBox type="text" placeholder="Name" name="name" className="input-box" />
                    <TextBox type="email" placeholder="Email" name="email" className="input-box" />
                    <TextBox
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="input-box"
                    />
                    <TextBox
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmpassword"
                      className="input-box"
                    />
                    <div className="navigation">
                      <Button
                        type="submit"
                        className="btn signup-btn"
                        disabled={isSubmitting ? true : false}
                      >
                        {isSubmitting ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Sign Up"
                        )}
                      </Button>
                      <span>or</span>
                      <span>
                        Already have account?{" "}
                        <button
                          type="button"
                          className="link"
                          onClick={openLogin}
                        >
                          Login
                        </button>
                      </span>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="signup-img">
              <CloseButton
                type="button"
                className="close"
                onClick={() => dispatch(signupShow(false))}
              />
              <div>
                <h2>Looks like you're new here!</h2>
                <span>Sign up with your email address to get started</span>
              </div>
              <FormImage />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

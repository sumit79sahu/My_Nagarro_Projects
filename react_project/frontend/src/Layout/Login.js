import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextBox from "../Component/Inputs/TextBox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { loginShow } from "../Store/Login/loginSlice";
import Modal from "react-bootstrap/Modal";
import FormImage from "../Component/Background/FormImage";
import { signupShow } from "../Store/Signup/signupSlice";
import "../Assets/styles/Layout/Login.css";
import { CloseButton } from "react-bootstrap";
import { authToken} from "../Store/Login/userAuthorizationSlice";
import Spinner from "react-bootstrap/Spinner";
import { emailVerificationShow } from "../Store/Verification/EmailVerification";

export default function Login() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const openSignup = () => {
    dispatch(loginShow(false));
    dispatch(signupShow(true));
  };

  const onLogin = async (values, { resetForm, setFieldError }) => {
    const result = await fetch("http://localhost:3000/api/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email, password: values.password }),
    });
    const response = await result.json();
    if (response.message === "NotAuthorizedException") {
      setFieldError("email", "Invalid Email");
      setFieldError("password", "Invalid password");
    }
    if (response.message === "UserNotConfirmedException") {
      resetForm();
      await fetch(`http://localhost:3000/api/resendverifycode/${values.email}`);
      dispatch(
        emailVerificationShow({
          email: values.email,
          verificationShow: true,
          successShow: false,
          failShow: false,
        })
      );
      dispatch(loginShow(false));
    }
    if (response.message === "success") {
      dispatch(authToken(response.token));
      dispatch(loginShow(false));
      resetForm(true);
    }
  };
  return (
    <>
      <Modal
        show={login}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="modal-body">
          <div className="login-container">
            <div className="login-form">
              <h3>Login</h3>
              <Formik
                initialValues={{
                  password: "",
                  email: "",
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                  password: Yup.string().required("Required"),
                })}
                onSubmit={(values, props) => {
                  props.setSubmitting(true);
                  onLogin(values, props);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <TextBox
                      name="email"
                      type="email"
                      placeholder="Someone@example.com"
                      className="input-box"
                    />
                    <TextBox
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="input-box"
                    />
                    <div className="navigation">
                      <Button
                        type="submit"
                        className="btn login-btn"
                        disabled={isSubmitting ? true : false}
                      >
                        {isSubmitting ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Login"
                        )}
                      </Button>
                      <span>or</span>
                      <span>
                        Don't have account?{" "}
                        <button
                          type="button"
                          className="link"
                          onClick={openSignup}
                        >
                          SignUp
                        </button>
                      </span>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="login-img">
              <CloseButton
                type="button"
                className="close"
                onClick={() => dispatch(loginShow(false))}
              />
              <div>
                <h2>Already a Member</h2>
                <span>Get access to your Orders, Wishlist and Recommendations</span>
              </div>
              <FormImage />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

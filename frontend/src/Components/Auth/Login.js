import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as ReactIcons from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LoginApi from "../../Api/LoginApi";
import { LoginSchema } from "../../Utils/Validator";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = React.useContext(AuthContext);

  const initialValue = {
    UserName: "",
    Password: "",
  };

  var accessToken;
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
        LoginApi.postUser(values)
          .then((res) => {
            if (res.success) {
              // console.log(res);
              accessToken = res.data;
              return res.data;
            } else {
              console.log(res);
            }
          })
          .then((token) => {
            return LoginApi.getUser(token);
          })
          .then((result) => {
            // console.log(result);
            dispatch({
              type: "LOGIN",
              payload: { user: result.data, token: `${accessToken}` },
            });
            navigate("/");
          })
          .catch(function (error) {
            console.log(error);
          });
      }}
    >
      {({ touched, errors, isSubmitting, values, handleChange }) => (
        <Form
          className="mt-4 mx-auto d-flex flex-column justify-content-center border rounded-3 my-4 p-3"
          style={{ width: "500px" }}
        >
          {/* <div>{values.UserName && <Navigate to="/register" replace={true} />}</div> */}

          <div className="form-group mt-3">
            <label htmlFor="UserName">User Name</label>
            <Field
              type="text"
              name="UserName"
              placeholder="User Name"
              autoComplete="off"
              className={`mt-2 form-control
                          ${
                            touched.UserName && errors.UserName
                              ? "is-invalid"
                              : ""
                          }`}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <ErrorMessage
              component="div"
              name="UserName"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group mt-3 ">
            <label htmlFor="Password">Password</label>
            <Field
              type="Password"
              name="Password"
              placeholder="Password"
              className={`mt-2 form-control
                          ${
                            touched.Password && errors.Password
                              ? "is-invalid"
                              : ""
                          }`}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <ErrorMessage
              component="div"
              name="Password"
              className="invalid-feedback"
            />
          </div>

          <div className="row my-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example31"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="form2Example31">
                  Remember me
                </label>
              </div>
            </div>

            <div className="col text-center">
              <Link to="/resetpassword">Forgot password?</Link>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>

          <div className="text-center">
            <p>
              Not a member? <Link to="/register">Register</Link>
            </p>
            <p>or sign up with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <ReactIcons.FaFacebook className="fab fa-facebook-f"></ReactIcons.FaFacebook>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <ReactIcons.FaGoogle className="fab fa-google"></ReactIcons.FaGoogle>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <ReactIcons.FaTwitter className="fab fa-twitter"></ReactIcons.FaTwitter>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <ReactIcons.FaGithub className="fab fa-github"></ReactIcons.FaGithub>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

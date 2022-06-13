import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as ReactIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import ResetPassApi from "../../Api/ResetPassApi";
import { ResetPassSchema } from "../../Utils/Validator";

export default function ResetPassword() {
  
  const initialValue = {
    UserName: "",
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={ResetPassSchema}
      onSubmit={(values) => {
        console.log(values);
        ResetPassApi.postUser(values)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
      }}
    >
      {({ touched, errors, isSubmitting, values, handleChange }) =>
        (
          <Form
            className="mt-4 mx-auto d-flex flex-column justify-content-center border rounded-3 my-4 p-3"
            style={{ width: "500px" }}
          >
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
            <button type="submit" className="btn btn-primary btn-block my-4">
              Submit
            </button>

            <div className="text-center">
              <p>
                Not a member? <Link to="register">Register</Link>
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
        )
      }
    </Formik>
  );
}

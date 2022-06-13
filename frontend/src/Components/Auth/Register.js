import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterApi from "../../Api/RegisterApi";
import defaultImageSrc from "../../Assets/Images/luffy.jpg";
import { RegisterSchema } from "../../Utils/Validator";

export default function Register() {
  const navigate = useNavigate();

  const [isNotification, setIsNotification] = useState(false);

  const ToggleIsNotification = () => {
    isNotification ? setIsNotification(false) : setIsNotification(true);
  };
  const classes = clsx(
    "notification bg-light border rounded position-absolute top-50 start-50 translate-middle text-center ",
    {
      "is-notification": isNotification,
    }
  );

  function useOutsideAlerter(ref, isNotification) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          isNotification
        ) {
          ToggleIsNotification();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isNotification, ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, isNotification);

  var [FileSelect, setFileSelect] = useState({
    ImageFile: null,
    ImageSrc: defaultImageSrc,
  });

  const initialValue = {
    UserName: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
    Name: "",
    Avatar: "",
  };

  const imageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let ImageFile = e.target.files[0];
      console.log(ImageFile);
      var reader = new FileReader();

      reader.onload = (x) => {
        if (reader.readyState === 2) {
          setFileSelect({
            ImageFile,
            ImageSrc: reader.result,
          });
        }
      };
      reader.readAsDataURL(ImageFile);
    } else {
      setFileSelect({
        ImageFile: null,
        ImageSrc: defaultImageSrc,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <Formik
        initialValues={initialValue}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("UserName", values.UserName);
          formData.append("Email", values.Email);
          formData.append("Password", values.Password);
          formData.append("PhoneNumber", values.PhoneNumber);
          formData.append("Name", values.Name);
          formData.append("Avatar", FileSelect.ImageFile);

          for (var pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
          }

          RegisterApi.postUser(formData)
            .then(function (response) {
              console.log(response);

              if (response.success) {
                ToggleIsNotification();
                alert("Đăng ký thành công");
                navigate("/login", { replace: true });
              } else {
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {({ touched, errors, values, handleChange }) => (
          <>
            <Form
              className="row p-4 border rounded-3 position-relative"
              style={{ width: "500px" }}
            >
              <div className="my-4">
                <div className="col-lg-12 text-center">
                  <h1 className="text-center">Register Form</h1>
                </div>
              </div>
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
                <label htmlFor="Email">Email</label>
                <Field
                  type="Email"
                  name="Email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  className={`mt-2 form-control
                          ${touched.Email && errors.Email ? "is-invalid" : ""}`}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />

                <ErrorMessage
                  component="div"
                  name="Email"
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

              <div className="form-group mt-3 ">
                <label htmlFor="PhoneNumber">Phone Number</label>
                <Field
                  type="tel"
                  name="PhoneNumber"
                  placeholder="Phone Number"
                  autoComplete="off"
                  className={`mt-2 form-control
                          ${
                            touched.PhoneNumber && errors.PhoneNumber
                              ? "is-invalid"
                              : ""
                          }`}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <ErrorMessage
                  component="div"
                  name="PhoneNumber"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="Name">Name</label>
                <Field
                  type="text"
                  name="Name"
                  placeholder="Name"
                  autoComplete="off"
                  className={`mt-2 form-control
                          ${touched.Name && errors.Name ? "is-invalid" : ""}`}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <ErrorMessage
                  component="div"
                  name="Name"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group mt-3 w-50 float-start">
                <label htmlFor="Avatar">Avatar</label>
                <Field
                  // style={{ width: "90px" }}
                  accept="image/*"
                  type="file"
                  name="Avatar"
                  className={`mt-2 form-control
                          ${
                            touched.Avatar && errors.Avatar ? "is-invalid" : ""
                          }`}
                  onChange={(e) => {
                    handleChange(e);
                    imageHandler(e);
                  }}
                />
                <ErrorMessage
                  component="div"
                  name="Avatar"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group mt-3 w-50 float-end d-flex justify-content-center ">
                <img
                  src={FileSelect.ImageSrc}
                  alt="Avatar"
                  className="border rounded "
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block mt-4">
                Submit
              </button>
            </Form>
            <div
              ref={wrapperRef}
              className={classes}
              style={{ width: "700px", height: "350px", display: "none"}}
              
            >
              <h3 className="notification text-danger">
                Đăng ký tài khoản thất bại!{" "}
              </h3>
              <div className="px-5 my-4 text-start">
                <p className="errorMessage">Email đã được đăng ký</p>
              </div>
              <button
                type="button"
                className="btn btn-primary position-absolute mb-5 me-5 bottom-0 end-0"
                onClick={ToggleIsNotification}
              >
                OK
              </button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}

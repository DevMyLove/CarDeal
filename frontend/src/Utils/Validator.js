// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


const RegisterSchema = Yup.object().shape({
  UserName: Yup.string().required("User name is required"),
  Email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  Password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required"),
  PhoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
  Name: Yup.string().required("Name is required"),
  Avatar: Yup.string().required("Name is required"),
});

const LoginSchema = Yup.object().shape({
  UserName: Yup.string().required("User name is required"),
  Password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required"),
});

const ResetPassSchema = Yup.object().shape({
  UserName: Yup.string().required("User name is required"),
 
});

export { RegisterSchema, LoginSchema, ResetPassSchema };

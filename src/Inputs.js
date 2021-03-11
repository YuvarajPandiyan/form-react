import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
// import hello from "./Hello.js";

const Inputs = () => {
  const [b, setb] = useState("SignUp");
  const history = useHistory();
  const h = () => {
    history.push("/helloWorld");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "'Must be 15 characters or less'")
        .required("Require"),
      email: Yup.string().email("Invalid Email").required("Require"),
      password: Yup.string()
        .required("Require")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
      password2: Yup.string()
        .required("Require")
        .when("password", {
          is: (password) => (password && password.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Password doesn't match"
          ),
        }),
    }),
    onSubmit: (values) => {
      setb("Done! :)");
      h();
    },
  });

  return (
    <div className="body__container">
      <Formik>
        <div className="form__container">
          <form
            className="form__container--form"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="form__container--form--heading">Create Account</h1>
            <input
              className="form__container--form--fileds"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
            <input
              className="form__container--form--fileds"
              id="username"
              name="username"
              type="text"
              placeholder="Name"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
            <input
              className="form__container--form--fileds"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
            <input
              className="form__container--form--fileds"
              id="password2"
              name="password2"
              type="password"
              placeholder="Confirm Password"
              {...formik.getFieldProps("password2")}
            />
            {formik.touched.password2 && formik.errors.password2 ? (
              <div className="error">{formik.errors.password2}</div>
            ) : null}
            <button className="form__signin--btn" type="submit">
              {b}
            </button>
          </form>
        </div>
      </Formik>
      <div className="img"></div>
    </div>
  );
};

export default Inputs;

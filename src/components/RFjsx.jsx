import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import RenderCityStates from "./common/RenderCityStates";
import firebase from "../config";

const db = firebase.firestore();

function RFJs() {
  let history = useHistory();
  let [customError, setError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email id is Required"),
    phone: Yup.number().required("Phone Number is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Password Must be between 8-15 Characters")
      .max(15),
    confirmPassword: Yup.string()
      .required("Please Re-type Password")
      .min(8, "Password Must be between 8-15 Characters")
      .max(15),
    city: Yup.string().required("Please Select City"),
    states: Yup.string().required("Please Select State"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        city: "",
        states: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const pass1 = values.password;
        const pass2 = values.confirmPassword;
        if (pass1 !== pass2) {
          setError("Confirm Password Doesn't Match");

          return;
        }

        try {
          await db.collection("users").add({
            email: values.email,
            phone: values.phone,
            password: values.password,
            state: values.states,
            city: values.city,
          });
          history.replace("/success");
        } catch (ex) {
          alert("Failed to submit form");
          console.log(ex);
        }
      }}
    >
      {(formik) => (
        <div className="form-container">
          <h2 className="title">Regiser</h2>
          <h3 className="sub-title">Welcome On Board!</h3>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="abc@xyz.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

            <label htmlFor="phone">Contact Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="1234567890"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error">{formik.errors.phone}</div>
            ) : null}

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="paasword"
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              // onChange={handleConfirmPassword()}
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error">{formik.errors.confirmPassword}</div>
            ) : (
              <div className="error">{customError}</div>
            )}

            <RenderCityStates
              formik={formik}
              selectedState={formik.values.states}
            ></RenderCityStates>

            <br></br>
            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
}

export default RFJs;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import RenderCityStates from "./common/RenderCityStates";
import firebase from "../config";
import TextInputField from "./common/TextInputField";
// import ErrorMsg from "./common/ErrorMsg";
// import Custom from "./common/ErrorMsg";

const db = firebase.firestore();

function RegisterForm() {
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
          //   console.log("pswd not matching");

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
          <Form>
            <TextInputField
              name="email"
              type="text"
              label="Email"
            ></TextInputField>
            <TextInputField
              name="phone"
              type="text"
              label="Contact Number"
            ></TextInputField>

            <TextInputField
              name="password"
              type="password"
              label="Password"
            ></TextInputField>

            <TextInputField
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              customError={customError}
            ></TextInputField>

            <RenderCityStates
              formik={formik}
              selectedState={formik.values.states}
            ></RenderCityStates>

            <br></br>
            <button type="submit" className="button">
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default RegisterForm;

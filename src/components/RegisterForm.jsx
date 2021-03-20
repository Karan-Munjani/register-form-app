import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FetchCityService from "../services/fetchCityService";

function RegisterForm() {
  let [customError, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      cityState: "",
    },

    validationSchema: Yup.object({
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
      cityState: Yup.string().required("Please Select City/State"),
    }),

    onSubmit: (values) => {
      const pass1 = formik.values.password;
      const pass2 = formik.values.confirmPassword;
      if (pass1 !== pass2) {
        setError("Confirm Password Doesn't Match");

        return;
      }
      if (formik.values.cityState !== "") {
        setError("Please Select Your City/State");
      }
      alert(JSON.stringify(values, null, 2));
      window.location = "/success";
    },
  });

  return (
    <>
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

          <label htmlFor="cityState">City/State</label>
          <select
            name="cityState"
            id="cityState"
            {...formik.getFieldProps("cityState")}
          >
            <option value=""></option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          {formik.touched.cityState && formik.errors.cityState ? (
            <div className="error">{formik.errors.cityState}</div>
          ) : null}

          <br></br>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
      <FetchCityService></FetchCityService>
    </>
  );
}

export default RegisterForm;

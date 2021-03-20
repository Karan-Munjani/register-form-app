import React from "react";
import csc from "country-state-city";

function RenderCityStates({ formik, selectedState }) {
  const states = csc.getStatesOfCountry("IN");
  //   console.log(selectedState);
  const cities = csc.getCitiesOfState("IN", selectedState);

  return (
    <>
      <label htmlFor="states">States</label>
      <select name="states" id="states" {...formik.getFieldProps("states")}>
        <option value=""></option>
        {states.map((s) => (
          <option key={s.isoCode} value={s.isoCode}>
            {s.name}
          </option>
        ))}
      </select>
      {formik.touched.states && formik.errors.states ? (
        <div className="error">{formik.errors.states}</div>
      ) : null}

      <label htmlFor="city">City</label>
      <select name="city" id="city" {...formik.getFieldProps("city")}>
        <option value=""></option>
        {cities.map((c) => (
          <option key={c.name + "8"} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      {formik.touched.city && formik.errors.city ? (
        <div className="error">{formik.errors.city}</div>
      ) : null}
    </>
  );
}

export default RenderCityStates;

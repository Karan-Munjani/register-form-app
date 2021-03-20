import React from "react";

function RenderCityStates({ formik, selectedState, states, cities }) {
  console.log(selectedState);
  const opCities = cities.filter((c) => c.stateCode === selectedState);
  console.log(opCities);

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
        {opCities.map((c) => (
          <option key={c.name} value={c.name}>
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

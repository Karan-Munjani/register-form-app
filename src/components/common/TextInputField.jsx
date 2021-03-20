import React from "react";
import { useField } from "formik";

// We can use field meta to show an error message if the field is invalid and it has been touched (i.e. visited)

function TextInputField({ label, customError, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : (
        <div className="error">{customError}</div>
      )}
    </>
  );
}

export default TextInputField;

import React from "react";
import { useField } from 'formik';
import '../../Assets/styles/Components/Inputs.css'
export default function TextBox(props) {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="input-container">
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="input-error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

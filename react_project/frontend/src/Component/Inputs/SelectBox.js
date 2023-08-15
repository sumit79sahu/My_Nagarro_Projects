import React from "react";
import { useField } from 'formik';
import '../../Assets/styles/Components/Inputs.css'
export default function SelectBox({ label, ...props }){
    const [field, meta] = useField(props);
    return (
      <div className="input-container">
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="input-error">{meta.error}</div>
        ) : null}
      </div>
    );
  };
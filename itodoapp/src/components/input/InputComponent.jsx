/** @format */

import React from "react";
import input_style from "./input.module.css";

const InputComponent = ({
  isEmpty,
  placeholder,
  name,
  onChange,
  errorMsg,
  showErrMsg,
  value,
  type,
}) => {
  return (
    <div className={input_style.form__group}>
      <input
        type={type}
        className={input_style.form__field}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        required
      />
      <label className={input_style.form__label} htmlFor={name}>
        {placeholder}
      </label>
      {showErrMsg && (
        <div className={input_style.error_msg}>{`Превышен лимит текста задачи на ${
          Number(errorMsg) - 100
        } символов`}</div>
      )}
    </div>
  );
};
export default InputComponent;

/** @format */

import styles from "./styles.module.css";
import React, { useRef } from "react";

export const Button = ({ text, onClick, type, disabled = false }) => {
  const btnRef = useRef(null);
  return (
    <button
      ref={btnRef}
      className={disabled ? `${styles.btn_primary} ${styles.disabled}` : `${styles.btn_primary}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

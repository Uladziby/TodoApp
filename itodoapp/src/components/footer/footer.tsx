/** @format */

import React, { useState } from "react";
import { Button } from "../button/button";
import InputComponent from "../input/InputComponent";
import styles from "./styles.module.css";

const max_ln = 100;
type PropFooter = {
  handlerAddTodo: (data: string) => void;
};

const Footer: React.FC<PropFooter> = ({ handlerAddTodo }) => {
  const [textTodo, setTextTodo] = useState("");
  const [error, showError] = useState(false);
  const handlerInputTodo = () => {
    handlerAddTodo(textTodo);
    setTextTodo("");
  };
  const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    showError(false);
    setTextTodo(e.target.value);
    if (textTodo.length > max_ln) {
      showError(true);
    }
  };
  return (
    <div className={styles.footer}>
      <Button text={"New Todo"} onClick={handlerInputTodo} type={"submit"} disabled={error} />
      <InputComponent
        isEmpty={true}
        value={textTodo}
        name={"new_todo"}
        onChange={onChangeTodo}
        errorMsg={textTodo.length}
        showErrMsg={error}
        type={"text"}
        placeholder={undefined}
      />
    </div>
  );
};

export default Footer;

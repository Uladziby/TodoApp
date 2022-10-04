/** @format */

import Checkbox from "../checkbox/checkbox";
import { ITodo } from "../shared/interfaces";
import styles from "./styles.module.css";
import more_icon from "../../assets/more_icon.png";
import remove_icon from "../../assets/remove_icon.svg";
import edit from "../../assets/edit.png";
import fill_star from "../../assets/fill_star.png";
import empty_star from "../../assets/empty_star.png";
import { useEffect, useRef, useState } from "react";
import { deleteTodoThunk, editTodoThunk } from "../../redux/todoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectTodosList } from "../../redux/selectors";
import { useClickOutside } from "../shared/useClickoutside";

type PropsTodo = {
  todo: ITodo;
};

export const To: React.FC<PropsTodo> = ({
  todo: { id, text, isFavourite, isCompleted },
}: PropsTodo) => {
  const [IsOpenMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const todoElement = useSelector(selectTodosList).find((el) => el.id === id);
  const [inputVal, setInputVal] = useState("");
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlerCompletedTasks = () => {
    dispatch(editTodoThunk({ id: id, isCompleted: !isCompleted }));
  };

  const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
  };
  const openDropDown = () => {
    setOpenMenu((prev) => (prev = !prev));
  };
  const onDeleteTodo = () => {
    dispatch(deleteTodoThunk(id));
    setOpenMenu(false);
  };
  const onEditTodo = () => {
    setEditing(true);
    setOpenMenu(false);
  };
  const onSubmitEditTodo = () => {
    dispatch(editTodoThunk({ id: id, text: inputVal }));
    setEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current!.focus();
    }
  }, [isEditing]);

  let domNode: any = useClickOutside(() => {
    setOpenMenu(false);
  });

  return (
    <div className={styles.todoElement} ref={domNode}>
      <Checkbox isChecked={todoElement?.isCompleted} handleChange={handlerCompletedTasks} />
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            className={styles.todo_input}
            defaultValue={text}
            onChange={onChangeTodo}
          />
          <button onClick={onSubmitEditTodo}>ok</button>
        </>
      ) : (
        <div
          className={`${styles.todo_input} ${
            todoElement?.isCompleted ? styles.completed_task : ""
          }`}
        >
          {text}
        </div>
      )}
      <div className={styles.dropdown}>
        <button className={styles.more_btn} onClick={openDropDown}>
          <img src={more_icon} alt="more_icon" width={20} />
        </button>
        {IsOpenMenu ? (
          <div className={styles.dropdown_content}>
            <button className={styles.menu_btn} onClick={onDeleteTodo}>
              <img src={remove_icon} alt="remove_icon" width={20} />
            </button>
            <button className={styles.menu_btn} onClick={onEditTodo}>
              <img src={edit} alt="edit" width={20} />
            </button>
            <button
              className={styles.menu_btn}
              onClick={() => {
                dispatch(editTodoThunk({ id: id, isFavourite: !isFavourite }));
              }}
            >
              <img src={empty_star} alt="favourite" width={30} />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.favourite_btn}>
        {todoElement?.isFavourite ? (
          <img src={fill_star} alt="fill_star" width={25} />
        ) : (
          <img src={empty_star} alt="empty_star" width={30} />
        )}
      </div>
    </div>
  );
};

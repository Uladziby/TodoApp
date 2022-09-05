/** @format */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styles from "./App.module.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import { ITodo } from "./components/shared/interfaces";
import { TodoComponent } from "./components/todo/TodoComponent";
import { selectTodos } from "./redux/selectors";
import { AppDispatch } from "./redux/store";
import { fetchTodos, postTodoThunk } from "./redux/todoSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { todosList } = useSelector(selectTodos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handlerAddTodo = (data: string) => {
    const newTodo: ITodo = {
      text: data,
      isFavourite: false,
      isCompleted: false,
      id: "",
    };
    dispatch(postTodoThunk(newTodo));
  };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Header />
        {
          <div className={styles.content}>
            {todosList
              ? todosList.map((todo) => {
                  return <TodoComponent key={todo.id} todo={todo} />;
                })
              : ""}
          </div>
        }
        <Footer handlerAddTodo={handlerAddTodo} />
      </div>
    </div>
  );
}

export default App;

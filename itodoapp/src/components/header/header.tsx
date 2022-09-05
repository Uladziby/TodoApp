/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchTodos, filterTodosThunk } from "../../redux/todoSlice";
import { typeOfFilters } from "../shared/interfaces";
import styles from "./styles.module.css";

const Header: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState<typeOfFilters>(typeOfFilters.allTodo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    !currentFilter ? dispatch(fetchTodos()) : dispatch(filterTodosThunk(currentFilter));
  }, [currentFilter]);

  const handlerSetFilter = (filter: typeOfFilters) => {
    setCurrentFilter((prev) =>
      prev === filter ? (prev = typeOfFilters.allTodo) : (prev = filter)
    );
  };

  return (
    <div className={styles.header}>
      <button
        className={`${styles.btn_filter} ${
          currentFilter === typeOfFilters.completed ? styles.active : ""
        }`}
        onClick={() => handlerSetFilter(typeOfFilters.completed)}
      >
        Done
      </button>
      <button
        className={`${styles.btn_filter} ${
          currentFilter === typeOfFilters.progress ? styles.active : ""
        }`}
        onClick={() => handlerSetFilter(typeOfFilters.progress)}
      >
        In Progress
      </button>
      <button
        className={`${styles.btn_filter} ${
          currentFilter === typeOfFilters.favourite ? styles.active : ""
        }`}
        onClick={() => handlerSetFilter(typeOfFilters.favourite)}
      >
        Favourite
      </button>
    </div>
  );
};

export default Header;

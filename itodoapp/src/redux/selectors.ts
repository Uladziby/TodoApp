/** @format */

import { IStore } from "./../components/shared/interfaces";
export const selectSelf = (state: IStore) => state;
export const selectTodos = (state: IStore) => state.todos;
export const selectMenu = (state: IStore) => state.todos.isMenuOpen;
export const selectTodosList = (state: IStore) => state.todos.todosList;
export const selectTodoById = (state: IStore, id: string) =>
  state.todos.todosList.find((el) => el.id === id);

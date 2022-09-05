/** @format */

export interface ITodo {
  id: string;
  text: string;
  isFavourite: boolean;
  isCompleted: boolean;
}

export interface ITodosSlice {
  todosList: ITodo[];
  isMenuOpen: boolean;
}

export interface IStore {
  todos: ITodosSlice;
}
export interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

export interface IFilterSlice {
  isActiveDone: boolean;
  isActiveProgress: boolean;
  isActiveFavourite: boolean;
}

export type typePutTodoRequest = Partial<ITodo>;

export enum typeOfFilters {
  allTodo = "",
  progress = "isProgress",
  favourite = "isFavourite",
  completed = "isCompleted",
}

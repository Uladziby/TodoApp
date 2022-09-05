/** @format */

import { ITodo, typePutTodoRequest } from "./../components/shared/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  editTodo,
  filterTodos,
  getTodos,
  postTodo,
  removeTodoById,
} from "../components/shared/api";
import { ITodosSlice } from "./../components/shared/interfaces";

export const initialState: ITodosSlice = {
  todosList: [],
  isMenuOpen: false,
};

export const fetchTodos = createAsyncThunk("todoSlice/fetchTodos", async () => {
  const response = await getTodos();
  return response;
});

export const postTodoThunk = createAsyncThunk(
  "todoSlice/postTodoThunk",
  async (todo: ITodo, { rejectWithValue }) => {
    try {
      const response = await postTodo(todo);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "todoSlice/deleteTodoThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await removeTodoById(id);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editTodoThunk = createAsyncThunk(
  "todoSlice/editTodoThunk",
  async (data: typePutTodoRequest, { rejectWithValue }) => {
    try {
      const response = await editTodo(data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const filterTodosThunk = createAsyncThunk(
  "todoSlice/filterTodosThunk",
  async (typyFilter: string, { rejectWithValue }) => {
    try {
      const response = await filterTodos(typyFilter);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todosList = action.payload;
    });
    builder.addCase(postTodoThunk.fulfilled, (state, action) => {
      state.todosList.push(action.payload);
    });
    builder.addCase(postTodoThunk.rejected, (state, action) => {
      console.log(action.payload, "error");
    });
    builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
      state.todosList = state.todosList.filter((elem) => elem.id !== action.payload.id);
    });
    builder.addCase(editTodoThunk.fulfilled, (state, { payload }) => {
      const updatedElement = state.todosList.find((item) => item.id === payload.id);
      updatedElement!.isCompleted = payload.isCompleted;
      updatedElement!.isFavourite = payload.isFavourite;
      updatedElement!.text = payload.text;
    });
    builder.addCase(filterTodosThunk.fulfilled, (state, { payload }) => {
      state.todosList = payload;
    });
  },
});

export default todoSlice.reducer;
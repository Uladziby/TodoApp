/** @format */

import { ITodo, typeOfFilters, typePutTodoRequest } from "./interfaces";
export const base_url = "https://630e770a37925634187dc5e4.mockapi.io";

export async function getTodos(): Promise<ITodo[]> {
  try {
    const response = await fetch(`${base_url}/todos`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
}
export async function postTodo(todo: ITodo): Promise<ITodo> {
  const response = await fetch(`${base_url}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
}

export async function removeTodoById(id: string): Promise<ITodo> {
  const response = await fetch(`${base_url}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data, "response");
  return data;
}

export async function editTodo(textTodo: typePutTodoRequest): Promise<ITodo> {
  const response = await fetch(`${base_url}/todos/${textTodo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(textTodo),
  });
  const data = await response.json();
  return data;
}

export async function filterTodos(typeFilter: string): Promise<ITodo[]> {
  let queryKey = typeFilter;
  let url = `${base_url}/todos?${queryKey}=${true}`;
  if (typeFilter === typeOfFilters.progress) {
    url = `${base_url}/todos?isCompleted=${false}`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import Todo from "./Todo";
import { RootState } from "../redux/Store";
import { setTodos } from "../redux/Slice";
import { ApiResponse, TodoAPI } from "../type/Type";

const ToDoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todos.todos);
  const currentEditTodo = useSelector(
    (state: RootState) => state.todos.currentEditTodo?.id
  );


  useEffect(() => {
    const fetchToDoList = async () => {
      try {
        const response: AxiosResponse<ApiResponse> = await axios.get(
          "https://dummyjson.com/todos/user/1"
        );
        const todosReturn = response.data.todos.map((todo: TodoAPI) => ({
          id: todo.id.toString(),
          name: todo.todo,
          isCompleted: todo.completed,
          iTime: new Date().toISOString(),
        }));
        dispatch(setTodos(todosReturn));
      } catch (error) {
        console.error("Error fetching to-dos:", error);
      }
    };
    if (todos.length === 0) {
      fetchToDoList();
    }
  }, [dispatch, todos]);

  return (
    <>
      <div>
        {todos.map((todo) => {
          return (
            <Todo
              todo={todo}
              key={todo.id}
              editMode={currentEditTodo === todo.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default ToDoList;

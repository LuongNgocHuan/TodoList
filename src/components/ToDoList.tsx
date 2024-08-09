import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import Todo from "./Todo";
import { AppDispatch, RootState } from "../redux/Store";
import { setLoadingList, setTodos } from "../redux/Slice";
import { ApiResponse, TodoAPI } from "../type/Type";
import { LoadingAM } from "./SVG/SVG";

const ToDoList = () => {
  const dispatch: AppDispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todos.todos);

  const loadingList = useSelector(
    (state: RootState) => state.todos.isLoadingList
  );

  useEffect(() => {
    const fetchToDoList = async () => {
      dispatch(setLoadingList(true));

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
      } finally {
        dispatch(setLoadingList(false));
      }
    };
    if (todos.length === 0) {
      fetchToDoList();
    }
  }, [dispatch, todos]);

  return (
    <div>
      {loadingList ? (
        <div className="flex justify-center items-center">{LoadingAM}</div>
      ) : (
        <div>
          {todos.map((todo) => {
            return <Todo todo={todo} key={todo.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ToDoList;

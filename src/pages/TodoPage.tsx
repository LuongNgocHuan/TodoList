// cSpell:ignore todos, uuidv
import CreateToDo from "../components/CreateToDo";
import { Link, Outlet } from "react-router-dom";
import ToDoList from "../components/ToDoList";

// img
import Code from "../assets/img/code.png";
import Hidden from "../assets/img/hidden.png";
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../redux/Slice";
import { RootState } from "../redux/Store";


function TodoPage() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);


  // API get list
  type TodoAPI = {
    id: number;
    todo: string;
    completed: boolean;
  };
  type ApiResponse = { todos: TodoAPI[] };

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
    // fetchToDoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="">
        <CreateToDo />

        <ToDoList />
      </div>
      <div className="flex justify-center mt-10 gap-8 ">
        <Link
          to="/set-code"
          className="flex justify-center items-center px-4 gap-2  p-2 bg-green-600 text-white rounded-xl shadow-lg shadow-slate-400"
        >
          {" "}
          <img className="size-4" src={Code} alt="" /> Click here
          to go set-code
        </Link>
        <Link
          to="/pin-code"
          className="flex justify-center items-center px-4 gap-2  p-2 bg-orange-500 text-white rounded-xl shadow-lg shadow-slate-400"
        >
          {" "}
          <img className="size-4" src={Hidden} alt="" /> Click here
          to go pin-code
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default TodoPage;

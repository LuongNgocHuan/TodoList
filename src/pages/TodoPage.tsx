// cSpell:ignore todos, uuidv
import { useEffect, useState } from "react";
import CreateToDo from "../components/CreateToDo";
import { Link, Outlet } from "react-router-dom";
import ToDoList from "../components/ToDoList";
import axios, { AxiosResponse } from "axios";
// import { TodoType } from "../redux/Slice";

// img
import Code from "../assets/img/code.png";
import Hidden from "../assets/img/hidden.png";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { addTodo, setTodos, updateTodos } from "../redux/Slice";

export type TodoType = {
  id: string;
  name: string;
  isCompleted: boolean;
  iTime: string;

};


function TodoPage() {
  const [toDoList, setToDoList] = useState<TodoType[]>([]);
  const dispatch: AppDispatch = useDispatch()
  const todos = useSelector((state: RootState)=>state.todos.todos);

  console.log(toDoList);

  // lưu trữ ToDo hiện tại đang được chỉnh sửa
  const [currentEditTodo, setCurrentEditTodo] = useState<TodoType | null>(null);
  
  const onCreateSuccess= (newItem:TodoType) => {
    console.log(newItem)
    dispatch(addTodo(newItem))
  }

  console.log(todos)


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
        console.log("fetchToDoList");
        dispatch(setTodos(todosReturn));
      } catch (error) {
        console.error("Error fetching to-dos:", error);
      }
    };
    if (todos.length === 0) {
      fetchToDoList();
    }
  }, [todos, dispatch]);

  const updateIsCompleted = async (todoId: string) => {
    const updatedTodo = todos.find((todo) => todo.id === todoId);
    if (updatedTodo) {
      try {
        await axios.put(`https://dummyjson.com/todos/1`, {
          todo: updatedTodo.name,
          completed: !updatedTodo.isCompleted,
          userId: 1,
        });
        dispatch(updateTodos({
          ...updatedTodo,
          isCompleted: !updatedTodo.isCompleted
        }));
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  // cập nhật trạng thái chỉnh sửa
  const editToDo = (todo: TodoType) => {
    setCurrentEditTodo(todo);
  };

  const saveEditedToDo = async (editedTodo: TodoType) => {
    try {
      await axios.put(`https://dummyjson.com/todos/1`, {
        // id: editedTodo.id,
        todo: editedTodo.name,
        completed: editedTodo.isCompleted,
        userId: 1,
      });

      dispatch(updateTodos(editedTodo));
    } catch (error) {
      console.error("Error saving edited to-do:", error);
    }
    setCurrentEditTodo(null);
  };

  // cancel
  const cancelEdit = () => {
    setCurrentEditTodo(null);
  };

  // localstores

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="">
        <CreateToDo
          onCreateSuccess={onCreateSuccess}
        />

        <ToDoList
          toDoList={todos}
          updateIsCompleted={updateIsCompleted}
          // edit
          editToDo={editToDo}
          saveEditedToDo={saveEditedToDo}
          cancelEdit={cancelEdit}
          currentEditTodo={currentEditTodo}
          setToDoList={setToDoList}
        />
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

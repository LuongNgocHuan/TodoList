// cSpell:ignore todos, uuidv
import { useEffect, useState } from "react";
import CreateToDo from "../components/CreateToDo";
import { Link, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ToDoList from "../components/ToDoList";
import axios, { AxiosResponse } from "axios";

// img
import Code from "../assets/img/code.png";
import Hidden from "../assets/img/hidden.png";

export type TodoType = {
  id: string;
  name: string;
  isCompleted: boolean;
  iTime: string;
  loading: boolean
};

function TodoPage() {
  const [toDoList, setToDoList] = useState<TodoType[]>([]);

  console.log(toDoList);

  const [newToDoString, setNewToDoString] = useState("");

  const [editTodo, setEditTodo] = useState<TodoType | null>(null);

  const [loading, setLoading] = useState(false);



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
          // id: uuidv4(),
          name: todo.todo,
          isCompleted: todo.completed,
          iTime: new Date().toISOString(),
          loading: false
        }));
        console.log("fetchToDoList");
        setToDoList(todosReturn);
      } catch (error) {
        console.error("Error fetching to-dos:", error);
      }
    };
    fetchToDoList();
  }, []);

  const onNewToDoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewToDoString(e.target.value);
  };

  const onAddBtn = async () => {
    setLoading(true);

    const newToDoItem: TodoType = {
      id: uuidv4(),
      name: newToDoString,
      isCompleted: false,
      iTime: new Date().toISOString(),
      loading: false
    };

    try {
      await axios.post("https://dummyjson.com/todos/add", {
        // id: newToDoItem.id.toString(),
        todo: newToDoItem.name,
        completed: newToDoItem.isCompleted,
        userId: 1,
      });

      setToDoList([newToDoItem, ...toDoList]);
      setNewToDoString("");
    } catch (error) {
      console.error("Error adding new to-do:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateIsCompleted = async (todoId: string) => {
    const updatedTodo = toDoList.find((todo) => todo.id === todoId);
    if (updatedTodo) {
      try {
        await axios.put(`https://dummyjson.com/todos/1`, {
          todo: updatedTodo.name,
          completed: !updatedTodo.isCompleted,
          userId: 1,
        });
        setToDoList((prevState) =>
          prevState.map((todo) => {
            if (todo.id === todoId) {
              return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
          })
        );
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  // delete / API delete

  const deleteToDo = async (todoId: string) => {
    // setLoadDelete(true);
    // try {
    //   await axios.delete("https://dummyjson.com/todos/1");
    //   setToDoList((prevState) =>
    //     prevState.filter((todo) => todo.id !== todoId)
    //   );
    // } catch (error) {
    //   console.log("Error deleting to-do:", error);
    // } finally {
    //   setLoadDelete(false)
    // }

    setToDoList((prevState) =>
      prevState.map((todo) =>
        todo.id === todoId ? { ...todo, loading: true } : todo
      )
    );
  
    try {
      await axios.delete(`https://dummyjson.com/todos/1`);
      setToDoList((prevState) =>
        prevState.filter((todo) => todo.id !== todoId)
      );
    } catch (error) {
      console.log("Error deleting to-do:", error);
    } finally {
      setToDoList((prevState) =>
        prevState.map((todo) =>
          todo.id === todoId ? { ...todo, loading: false } : todo
        )
      );
    }
  };

  const editToDo = (todo: TodoType) => {
    setEditTodo(todo);
  };

  const saveEditedToDo = async (editedTodo: TodoType) => {
    try {
      await axios.put(`https://dummyjson.com/todos/1`, {
        // id: editedTodo.id,
        todo: editedTodo.name,
        completed: editedTodo.isCompleted,
        userId: 1,
      });

      setToDoList((prevState) =>
        prevState.map((todo) =>
          todo.id === editedTodo.id
            ? {
              ...todo,
              name: editedTodo.name,
              isCompleted: editedTodo.isCompleted,
              iTime: editedTodo.iTime,
            }
            : todo
        )
      );
    } catch (error) {
      console.error("Error saving edited to-do:", error);
    }
    setEditTodo(null);
  };

  // cancel
  const cancelEdit = () => {
    setEditTodo(null);
  };

  // localstores

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  return (
    <>
      <div className="">
        <CreateToDo
          newToDoString={newToDoString}
          onNewToDoChange={onNewToDoChange}
          onAddBtn={onAddBtn}
          loading={loading}
        />

        <ToDoList
          toDoList={toDoList}
          updateIsCompleted={updateIsCompleted}
          // delete
          deleteToDo={deleteToDo}
          // edit
          editToDo={editToDo}
          saveEditedToDo={saveEditedToDo}
          cancelEdit={cancelEdit}
          editTodo={editTodo}
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

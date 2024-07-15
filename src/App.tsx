// cSpell:ignore todos, uuidv
import { useEffect, useState } from "react";
import CreateToDo from "./components/CreateToDo";
import { Link, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ToDoList from "./components/ToDoList";
import axios, { AxiosResponse } from "axios";

export type TodoType = { id: string; name: string; isCompleted: boolean, };

function App() {
  const [toDoList, setToDoList] = useState<TodoType[]>([]);

  console.log(toDoList)
  

  const [newToDoString, setNewToDoString] = useState("");

  const [editTodo, setEditTodo] = useState<TodoType | null>(null);

  // API get list
  type TodoAPI = {
    id: number,
    todo: string,
    completed: boolean,
  }

  type ApiResponse = { todos: TodoAPI[] }

  useEffect(() => {
    const fetchToDoList = async () => {
      try {
        const response: AxiosResponse<ApiResponse> = await axios.get("https://dummyjson.com/todos/user/1");
        const todosReturn = response.data.todos.map((todo: TodoAPI) => ({
          id: todo.id.toString(),
          // id: uuidv4(),
          name: todo.todo,
          isCompleted: todo.completed
        }));
        console.log("fetchToDoList")
        setToDoList(todosReturn);
      } catch (error) {
        console.error("Error fetching to-dos:", error)
      }
    }
    fetchToDoList()
  },[ ])



  const onNewToDoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewToDoString(e.target.value);
  };


  // add / API ADD
  // const onAddBtn = async () => {
  //   // const newToDoItem: TodoType = {
  //   //   id: uuidv4(),
  //   //   name: newToDoString,
  //   //   isCompleted: false,
  //   // };

  //   try {
  //     const response = await axios.post("https://dummyjson.com/todos/add", {
  //       id: uuidv4(),
  //       todo: newToDoString,
  //       completed: false,
  //       userId: 1,

  //     });

  //     const addedToDo: TodoAPI = response.data

  //     setToDoList([{
  //       // id: addedToDo.id.toString(),
  //       id: uuidv4(),
  //       name: addedToDo.todo,
  //       isCompleted: addedToDo.completed
  //     }, ...toDoList]);

  //     setNewToDoString("");
  //   } catch (error) {
  //     console.error("Error adding new to-do:", error)
  //   }

  //   // setToDoList([newToDoItem, ...toDoList]);
  //   // setNewToDoString("");
  // };

  const onAddBtn = async () => {
    const newToDoItem: TodoType = {
      id: uuidv4(),
      name: newToDoString,
      isCompleted: false,
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
    }
  };

  // const updateIsCompleted = (todoId: string) => {
  //   setToDoList((prevState) =>
  //     prevState.map((todo) => {
  //       if (todo.id === todoId) {
  //         return { ...todo, isCompleted: !todo.isCompleted };
  //       }
  //       return todo;
  //     })
  //   );
  // };

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
    try {
      await axios.delete("https://dummyjson.com/todos/1")
      setToDoList((prevState) => prevState.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.log("Error deleting to-do:", error);

    }

  };

  // edit

  // const editToDo = (todo: TodoType) => {
  //   setEditTodo(todo);
  // };

  // const saveEditedToDo = (editedTodo: TodoType) => {
  //   setToDoList((prevState) =>
  //     prevState.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
  //   );
  //   setEditTodo(null);
  // };

  // const cancelEdit = () => {
  //   setEditTodo(null);
  // };


  const editToDo = (todo: TodoType) => {
    setEditTodo(todo);
  };



  // const saveEditedToDo = async (editedTodo: TodoType) => {
  //   try {
  //     await axios.put("https://dummyjson.com/todos/1/",{
  //       id: editedTodo.id,
  //       todo: editedTodo.name,
  //       completed: editedTodo.isCompleted,
  //       userId: 1,


  //     })
  //     setToDoList((prevState) =>
  //       prevState.map((todo) =>
  //         todo.id === editedTodo.id ? { ...todo, name: editedTodo.name } : todo
  //       )
  //     );

  //   } catch(error) {
  //     console.error("Error saving edited to-do:", error);
  //   }
  //   setEditTodo(null);
  // };

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
          todo.id === editedTodo.id ? { ...todo, name: editedTodo.name, isCompleted: editedTodo.isCompleted } : todo
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

  useEffect( () => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
  },[toDoList])


  return (
    <>


      <div className="">
        <CreateToDo
          newToDoString={newToDoString}
          onNewToDoChange={onNewToDoChange}
          onAddBtn={onAddBtn}
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


      <div className="flex justify-center mt-10" >
        <Link to="/set-code" className="ml-4 p-2 bg-slate-700 text-white rounded-lg">Click here to go set-code</Link>
      </div>
      <Outlet/>

    </>
  );
}

export default App;

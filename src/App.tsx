import { useState } from "react";
import CreateToDo from "./components/CreateToDo";
import { v4 as uuidv4 } from "uuid";
import ToDoList from "./components/ToDoList";

export type TodoType = { id: string; name: string; isCompleted: boolean };

function App() {
  const [toDoList, setToDoList] = useState<TodoType[]>([]);

  const [newToDoString, setNewToDoString] = useState("");

  const [editTodo, setEditTodo] = useState<TodoType | null>(null);

  const onNewToDoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewToDoString(e.target.value);
  };

  const onAddBtn = () => {
    const newToDoItem: TodoType = {
      id: uuidv4(),
      name: newToDoString,
      isCompleted: false,
    };
    setToDoList([newToDoItem, ...toDoList]);
    setNewToDoString("");
  };

  const updateIsCompleted = (todoId: string) => {
    setToDoList((prevState) =>
      prevState.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      })
    );
  };

  // delete

  const deleteToDo = (todoId: string) => {
    setToDoList((prevState) => prevState.filter((todo) => todo.id !== todoId));
  };

  // edit
  
  const editToDo = (todo: TodoType) => {
    setEditTodo(todo);
  };

  const saveEditedToDo = (editedTodo: TodoType) => {
    setToDoList((prevState) =>
      prevState.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
    );
    setEditTodo(null);
  };

  const cancelEdit = () => {
    setEditTodo(null);
  };

  return (
    <>
      <CreateToDo
        newToDoString={newToDoString}
        onNewToDoChange={onNewToDoChange}
        onAddBtn={onAddBtn}
      />

      <ToDoList
        toDoList={toDoList}
        updateIsCompleted={updateIsCompleted}
        deleteToDo={deleteToDo}


        
        editToDo={editToDo}
        saveEditedToDo={saveEditedToDo}
        cancelEdit={cancelEdit}
        editTodo={editTodo}

      />
    </>
  );
}

export default App;

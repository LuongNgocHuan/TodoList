import { KeyboardEvent, useState } from "react";
import List from "../assets/img/list.png"
import { AddTD, LoadingAM } from "./SVG/SVG";
import { v4 as uuidv4 } from "uuid";
import { TodoType } from "../pages/TodoPage";
import axios from "axios";



type Props = {
  // newToDoString: string;
  // onNewToDoChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCreateSuccess:(newItem:TodoType) => void;
};

const CreateToDo = ({ onCreateSuccess}: Props) => {
  const [loading, setLoading] = useState(false);
  const [newToDoString, setNewToDoString] = useState("");

  
  const onAddBtn = async () => {
    setLoading(true);

    const newToDoItem: TodoType = {
      id: uuidv4(),
      name: newToDoString,
      isCompleted: false,
      iTime: new Date().toISOString(),
      // loading: false
    };

    try {
      await axios.post("https://dummyjson.com/todos/add", {
        // id: newToDoItem.id.toString(),
        todo: newToDoItem.name,
        completed: newToDoItem.isCompleted,
        userId: 1,
      });

      onCreateSuccess(newToDoItem);
      setNewToDoString("");
    } catch (error) {
      console.error("Error adding new to-do:", error);
    } finally {
      setLoading(false);
    }
  };
  // enter on keyboard
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAddBtn();
    }
  };

  const onNewToDoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewToDoString(e.target.value);
  };


  return (
    <>
      <div className=" mt-4 mx-4 ">
        <div className="flex flex-col justify-center items-center my-10">
          <img className="size-16" src="../assets/img/list.png" alt="" />
          <p className="flex justify-center text-3xl font-bold mb-2">
            Create Your Todo-list
          </p>
        </div>
        <div className="flex justify-center gap-2">
          <input
            className="focus:outline-none pl-2 border-gray-500 border-2 border-opacity-20 rounded-lg shadow-md h-10 w-1/3"
            type="text"
            placeholder="Enter your to-dos"
            value={newToDoString}
            onChange={onNewToDoChange}
            onKeyPress={handleKeyPress}
          />

          <button
            className="bg-green-600 text-white px-2 rounded-lg"
            type="button"
            onClick={onAddBtn}
            disabled={loading}
          >
            {loading ? (LoadingAM
            ) : (AddTD)}

          </button>
        </div>
        <div className="flex justify-center">
          <hr className=" my-4 w-1/2 text-center" />
        </div>
      </div>
    </>
  );
};

export default CreateToDo;

import { KeyboardEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import {
  addTodo,
  isLoadingCreate,
  isNothingCreate,
  isNewToDoString,
} from "../redux/Slice";
import { TodoType } from "../redux/Slice";

import List from "../assets/img/list.png";
import { AddTD } from "./SVG/SVG";

const CreateToDo = () => {
  const dispatch: AppDispatch = useDispatch();

  const loading = useSelector(
    (state: RootState) => state.todos.statusCreate === true
  );
  const newToDoString = useSelector(
    (state: RootState) => state.todos.newToDoString
  );

  const onCreateSuccess = (newItem: TodoType) => {
    console.log(newItem);
    dispatch(addTodo(newItem));
  };

  const onAddBtn = async () => {
    dispatch(isLoadingCreate());

    const newToDoItem: TodoType = {
      id: uuidv4(),
      name: newToDoString,
      isCompleted: false,
      iTime: new Date().toISOString(),
    };

    try {
      await axios.post("https://dummyjson.com/todos/add", {
        todo: newToDoItem.name,
        completed: newToDoItem.isCompleted,
        userId: 1,
      });

      // dispatch(addTodo(newToDoItem));
      onCreateSuccess(newToDoItem);
      dispatch(isNewToDoString(""));
    } catch (error) {
      console.error("Error adding new to-do:", error);
    } finally {
      dispatch(isNothingCreate());
    }
  };
  // enter on keyboard
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAddBtn();
    }
  };

  const onNewToDoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(isNewToDoString(e.target.value));
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
            className={classNames(" text-white px-2 rounded-lg", {
              "bg-gray-600": loading,
              "bg-green-600": !loading,
            })}
            type="button"
            onClick={onAddBtn}
            disabled={loading}
          >
            {AddTD}
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

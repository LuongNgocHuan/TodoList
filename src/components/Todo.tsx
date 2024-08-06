import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {
  deleteTodos,
  setCurrentEditTodo,
  TodoType,
  updateTodos,
} from "../redux/Slice";
import { AppDispatch, RootState } from "../redux/Store";

import {
  CancleTD,
  CompletedFalse,
  CompletedTrue,
  DeleteTD,
  EditTD,
  SaveTD,
} from "./SVG/SVG";

dayjs.extend(relativeTime);



const Icon = ({
  todoId,
  isCompleted,
  updateIsCompleted,
}: {
  todoId: string;
  isCompleted: boolean;
  updateIsCompleted: (todoId: string) => void;
}) => {
  return (
    <div
      onClick={() => {
        updateIsCompleted(todoId);
      }}
    >
      {isCompleted
        ? // true
        CompletedTrue
        : // false
        CompletedFalse}
    </div>
  );
};

export const Todo = ({
  todo,
  editMode,
}: {
  todo: TodoType;
  editMode: boolean;
}) => {
  
  const { id, name, isCompleted, iTime } = todo;
  const itemTime = dayjs(iTime).format("MMM DD, YYYY");
  
  const dispatch: AppDispatch = useDispatch();
  const [editedName, setEditedName] = useState(name);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);


  const todos = useSelector((state: RootState) => state.todos.todos);
  console.log(todos);

  const currentEditTodo = useSelector(
    (state: RootState) => state.todos.currentEditTodo
  );
  console.log(currentEditTodo);


  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
    const textarea = inputRef.current;
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [editMode]);

  // cancel (theo doi thay doi cua name, neu editmode = false thi dat lai gia tri cua SetEditmode = name)
  useEffect(() => {
    if (!editMode) {
      setEditedName(name);
    }
  }, [editMode, name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedName(e.target.value);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    await saveEditedToDo({
      id: id,
      name: editedName,
      isCompleted,
      iTime,
    });
    cancelEdit();
    setLoading(false);
  };

  // enter on keyboard
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };


  const deleteToDo = async (todoId: string) => {
    setLoading(true);
    try {
      await axios.delete("https://dummyjson.com/todos/1");
      dispatch(deleteTodos(todoId));
    } catch (error) {
      console.log("Error deleting to-do:", error);
    } finally {
      setLoading(false);
    }
  };


  const updateIsCompleted = async (todoId: string) => {
    console.log("todoId--====>", todoId);
    const updatedTodo = todos.find((todo) => todo.id === todoId);
    if (updatedTodo) {
      try {
        await axios.put(`https://dummyjson.com/todos/1`, {
          todo: updatedTodo.name,
          completed: !updatedTodo.isCompleted,
          userId: 1,
        });
        dispatch(
          updateTodos({
            ...updatedTodo,
            isCompleted: !updatedTodo.isCompleted,
          })
        );
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
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
    dispatch(setCurrentEditTodo(null));
  };

  // cancel
  const cancelEdit = () => {
    dispatch(setCurrentEditTodo(null));
  };

  // cập nhật trạng thái chỉnh sửa
  const editToDo = (todo: TodoType) => {
    dispatch(setCurrentEditTodo(todo));
  };


  // localstores

  // useEffect(() => {
  //   localStorage.setItem("toDoList", JSON.stringify(todos));
  // }, [todos]);

  return (
    <>
      <div className="flex justify-center ml-4 mr-4">
        <div className="relative w-1/2 flex items-center justify-between border-gray-500 border-2 border-opacity-20  rounded-lg shadow-md min-h-14 min-w-96 h-auto pl-2 py-2 mb-4 ">
          <div className="flex gap-4">
            {/* add */}
            <button>
              <Icon
                isCompleted={isCompleted}
                todoId={id}
                updateIsCompleted={updateIsCompleted}
              />
            </button>
            {editMode ? (
              <textarea
                className="focus:outline-none xl:w-96 lg:w-72 md:w-40 h-20 bg-transparent "
                value={editedName}
                onChange={handleNameChange}
                onKeyPress={handleKeyPress}
                ref={inputRef}
              />
            ) : (
              <div className={isCompleted ? "line-through opacity-40" : ""}>
                {name}
              </div>
            )}
          </div>
          <div className=" flex gap-1 mr-2">
            {!editMode && (
              <div className=" flex justify-center items-center mr-2 text-xs opacity-40 font-semibold w-max">
                {itemTime}
              </div>
            )}

            {/* delete */}
            <button
              className={classNames("text-white px-2 py-1 rounded-lg max-h-8", {
                hidden: isCompleted,
                "bg-gray-600": loading,
                "bg-red-600": !loading,
              })}
              type="button"
              onClick={() => deleteToDo(id)}
              disabled={loading}
            >
              {DeleteTD}
            </button>

            {editMode ? (
              <div className="flex gap-1">
                {/* save */}
                <button
                  className={classNames(
                    " text-white px-2 py-1 rounded-lg max-h-8",
                    { "bg-gray-600": loading, "bg-green-600": !loading }
                  )}
                  type="button"
                  onClick={handleSaveClick}
                  disabled={loading}
                >
                  {SaveTD}
                </button>
                {/* cancel */}
                <button
                  className={classNames(
                    "text-white px-2 py-1 rounded-lg max-h-8",
                    {
                      hidden: isCompleted,
                      "bg-gray-600": loading,
                      "bg-blue-600": !loading,
                    }
                  )}
                  type="button"
                  onClick={cancelEdit}
                  disabled={loading}
                >
                  {CancleTD}
                </button>
              </div>
            ) : (
              // edit
              <button
                className={classNames(
                  "text-white px-2 py-1 rounded-lg max-h-8",
                  {
                    hidden: isCompleted,
                    "bg-gray-600": loading,
                    "bg-blue-600": !loading,
                  }
                )}
                type="button"
                onClick={() => {
                  editToDo({ id: id, name, isCompleted, iTime });
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
                disabled={loading}
              >
                {EditTD}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;

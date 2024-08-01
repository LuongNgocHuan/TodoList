import React, { useState, useRef, useEffect } from "react";
import { TodoType } from "../pages/TodoPage";
import { KeyboardEvent } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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
  updateIsCompleted,
  deleteToDo,

  editToDo,
  saveEditedToDo,
  cancelEdit,
  editMode,
}: {
  todo: TodoType;
  updateIsCompleted: (todoId: string) => void;
  deleteToDo: (todoId: string) => void;

  editToDo: (todo: TodoType) => void;
  saveEditedToDo: (editedTodo: TodoType) => Promise<void>;
  cancelEdit: () => void;
  editMode: boolean;
}) => {
  const { id, name, isCompleted, iTime } = todo;
  // edit
  const [editedName, setEditedName] = useState(name);
  const [loading, setLoading] = useState(false);
  

  const inputRef = useRef<HTMLTextAreaElement>(null);
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
    setLoading(true)
    await saveEditedToDo({
      id: id,
      name: editedName,
      isCompleted,
      iTime,
      // loading
    });
    cancelEdit();
    setLoading(false)
  };

  // enter on keyboard
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };

  const itemTime = dayjs(iTime).format("MMM DD, YYYY");

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
              className={
                isCompleted
                  ? "hidden"
                  : " bg-gray-600 text-white px-2 py-1 rounded-lg max-h-8"
              }
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
                  className="bg-green-600 text-white px-2 py-1 rounded-lg max-h-8"
                  type="button"
                  onClick={handleSaveClick}
                  disabled={loading}
                >
                  {SaveTD}
                </button>
                {/* cancel */}
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg max-h-8"
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
                className={
                  isCompleted
                    ? "hidden"
                    : "bg-blue-500 text-white px-2 py-1 rounded-lg max-h-8"
                }
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

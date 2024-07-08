import React, { useState } from "react";
import { TodoType } from "../App";
import { KeyboardEvent } from "react";

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
            {isCompleted ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            )}
        </div>
    );
};
export const Todo = ({
    todoId,
    name,
    isCompleted,
    updateIsCompleted,
    deleteToDo,

    editToDo,
    saveEditedToDo,
    cancelEdit,
    editMode,
}: {
    todoId: string;
    name: string;
    isCompleted: boolean;
    updateIsCompleted: (todoId: string) => void;
    deleteToDo: (todoId: string) => void;

    editToDo: (todo: TodoType) => void;
    saveEditedToDo: (editedTodo: TodoType) => void;
    cancelEdit: () => void;
    editMode: boolean;
}) => {
    const [editedName, setEditedName] = useState(name);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const handleSaveClick = () => {
        saveEditedToDo({
            id: todoId,
            name: editedName,
            isCompleted,
        });
        cancelEdit();
    };



    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSaveClick();
        }
    };

    return (

        <>
            <div className="ml-4 mr-4">
                <div onKeyPress={handleKeyPress} className="w-full flex items-center justify-between shadow-md h-10 pl-2 mb-4">
                    <div className="flex gap-20">

                        <button>
                            {
                                <Icon
                                    isCompleted={isCompleted}
                                    todoId={todoId}
                                    updateIsCompleted={updateIsCompleted}
                                />
                            }
                        </button>
                        {editMode ? (
                            <input
                                type="text"
                                className="pl-2 border-gray-500 shadow-md h-8"
                                value={editedName}
                                onChange={handleNameChange}
                            />
                        ) : (
                            <div>{name}</div>
                        )}
                    </div>
                    <div className="flex gap-1 pr-96 ">
                        <button
                            className=" bg-red-500 text-white px-2 py-1 rounded-sm"
                            type="button"
                            onClick={() => deleteToDo(todoId)}
                        >
                            Delete
                        </button>
                        {editMode ? (
                            <button
                                className="bg-blue-500 text-white px-2 py-1 rounded-sm"
                                type="button"
                                onClick={handleSaveClick}
                                
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 text-white px-2 py-1 rounded-sm"
                                type="button"
                                onClick={() => editToDo({ id: todoId, name, isCompleted })}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;

import Todo from "./Todo";
import { TodoType } from "../pages/TodoPage";

const ToDoList = ({
    toDoList,
    updateIsCompleted,
    deleteToDo,
    editToDo,
    saveEditedToDo,
    cancelEdit,
    editTodo,
}: {
    toDoList: TodoType[];
    updateIsCompleted: (todoId: string) => void;

    deleteToDo: (todoId: string) => void;

    editToDo: (todo: TodoType) => void;
    saveEditedToDo: (editedTodo: TodoType) => void;
    cancelEdit: () => void;
    editTodo: TodoType | null;
}) => {
    
    return (
        <>
            <div>
                {toDoList.map((todo) => {
                    return (
                        <Todo
                            todoId={todo.id}
                            key={todo.id}
                            name={todo.name}
                            isCompleted={todo.isCompleted}
                            updateIsCompleted={updateIsCompleted}

                            deleteToDo={deleteToDo}

                            editToDo={editToDo}
                            saveEditedToDo={saveEditedToDo}
                            cancelEdit={cancelEdit}
                            editMode={editTodo?.id === todo.id}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default ToDoList;

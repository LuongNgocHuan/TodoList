import Todo from "./Todo";
import { TodoType } from "../pages/TodoPage";

const ToDoList = ({
    toDoList,
    updateIsCompleted,
    editToDo,
    saveEditedToDo,
    cancelEdit,
    currentEditTodo,
    setToDoList
}: {
    toDoList: TodoType[];
    updateIsCompleted: (todoId: string) => Promise<void>;
    editToDo: (todo: TodoType) => void;
    saveEditedToDo: (editedTodo: TodoType) => Promise<void>;
    cancelEdit: () => void;
    currentEditTodo: TodoType | null;
    setToDoList: React.Dispatch<React.SetStateAction<TodoType[]>>

}) => {

    return (
        <>
            <div>
                {toDoList.map((todo) => {
                    return (
                        <Todo
                            todo={todo}
                            key={todo.id}
                            updateIsCompleted={updateIsCompleted}



                            editToDo={editToDo}
                            saveEditedToDo={saveEditedToDo}
                            cancelEdit={cancelEdit}
                            editMode={currentEditTodo?.id === todo.id}
                            setToDoList={setToDoList}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default ToDoList;

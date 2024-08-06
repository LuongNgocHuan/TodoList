import Todo from "./Todo";
import { RootState } from "../redux/Store";
import { useSelector } from "react-redux";

const ToDoList =  () => {
    const todos = useSelector((state: RootState) => state.todos.todos);
    const currentEditTodo = useSelector((state: RootState) => state.todos.currentEditTodo);
    return (
        <>
            <div>
                {todos.map((todo) => {
                    return (
                        <Todo
                            todo={todo}
                            key={todo.id}
                            editMode={currentEditTodo?.id === todo.id}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default ToDoList;

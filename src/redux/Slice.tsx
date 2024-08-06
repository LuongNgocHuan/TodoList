import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TodoType = {
    id: string,
    name: string,
    isCompleted: boolean,
    iTime: string
}

interface TodoState {
    todos: TodoType[];
    status: 'idle' | 'loading' | 'false';
}

const initialState: TodoState = {
    todos: [],
    status: 'idle'

}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos(state, action: PayloadAction<TodoType[]>) {
            state.todos = action.payload
        },
        addTodo(state, action: PayloadAction<TodoType>) {
            state.todos = [action.payload, ...state.todos]

        },
        updateTodos(state, action: PayloadAction<TodoType>) {
            state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)
        },
        setLoading(state) {
            state.status = "loading";
        },
        setIdle(state) {
            state.status = "idle";
        },
    }
});

export const { setTodos, addTodo, updateTodos, setLoading, setIdle } = todoSlice.actions;
export default todoSlice.reducer;
export type { TodoState };
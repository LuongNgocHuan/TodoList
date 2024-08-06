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
    currentEditTodo: TodoType | null
}

const initialState: TodoState = {
    todos: [],
    status: 'idle',
    currentEditTodo: null

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
        deleteTodos(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        setCurrentEditTodo(state, action: PayloadAction<TodoType | null>) {
            state.currentEditTodo = action.payload

        },
        setLoading(state) {
            state.status = "loading";
        },
        setIdle(state) {
            state.status = "idle";
        },
    }
});

export const { setTodos, addTodo, updateTodos, deleteTodos, setCurrentEditTodo, setLoading, setIdle } = todoSlice.actions;
export default todoSlice.reducer;
export type { TodoState };
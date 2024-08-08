import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TodoType = {
  id: string;
  name: string;
  isCompleted: boolean;
  iTime: string;
};

type TodoState = {
  // CreateTodo and Todo
  todos: TodoType[];
  isLoadingCreate: boolean;
  isLoadingList: boolean;
  currentEditTodo: TodoType | null;
};

const initialState: TodoState = {
  // CreateTodo and Todo
  todos: [],
  isLoadingCreate: false,
  isLoadingList: false,
  currentEditTodo: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // CreateTodo and Todo
    setTodos(state, action: PayloadAction<TodoType[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<TodoType>) {
      state.todos = [action.payload, ...state.todos];
    },
    updateTodos(state, action: PayloadAction<TodoType>) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    deleteTodos(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setCurrentEditTodo(state, action: PayloadAction<TodoType | null>) {
      state.currentEditTodo = action.payload;
    },
    setLoadingCreate(state, action: PayloadAction<boolean>) {
      state.isLoadingCreate = action.payload;
    },
    setLoadingList(state, action: PayloadAction<boolean>) {
      state.isLoadingList = action.payload;
    },
  },
});

export const {
  // CreateTodo and Todo
  setTodos,
  addTodo,
  updateTodos,
  deleteTodos,
  setCurrentEditTodo,
  setLoadingCreate,
  setLoadingList,
} = todoSlice.actions;
export default todoSlice.reducer;
export type { TodoState };

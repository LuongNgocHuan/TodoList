import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TodoType = {
  id: string;
  name: string;
  isCompleted: boolean;
  iTime: string;
};

type TodoState = {
  todos: TodoType[];
  statusCreate: boolean;
  statusList: boolean;
  currentEditTodo: TodoType | null;
  editedName: string;
  newToDoString: string;
  // PinCode
  hidden: boolean;
};

const initialState: TodoState = {
  todos: [],
  statusCreate: false,
  statusList: false,
  currentEditTodo: null,
  editedName: "",
  newToDoString: "",
  hidden: true,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
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
    isCurrentEditTodo(state, action: PayloadAction<TodoType | null>) {
      state.currentEditTodo = action.payload;
    },
    isLoadingCreate(state) {
      state.statusCreate = true;
    },
    isNothingCreate(state) {
      state.statusCreate = false;
    },
    isLoadingList(state) {
      state.statusList = true;
    },
    isNothingList(state) {
      state.statusList = false;
    },
    isEditedName(state, action: PayloadAction<string>) {
      state.editedName = action.payload;
    },
    isNewToDoString(state, action: PayloadAction<string>) {
      state.newToDoString = action.payload;
    },
    // PinCode
    isHidden(state, action: PayloadAction<boolean>) {
      state.hidden = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodo,
  updateTodos,
  deleteTodos,
  isCurrentEditTodo,
  isLoadingCreate,
  isNothingCreate,
  isLoadingList,
  isNothingList,
  isEditedName,
  isNewToDoString,
  isHidden,
} = todoSlice.actions;
export default todoSlice.reducer;
export type { TodoState };

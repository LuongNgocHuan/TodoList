// API get list
export type TodoAPI = {
  id: number;
  todo: string;
  completed: boolean;
};
export type ApiResponse = { todos: TodoAPI[] };

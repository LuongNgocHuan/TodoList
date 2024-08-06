import { configureStore } from "@reduxjs/toolkit";
import reducer from "./Reducer";
import todoReducer from './Slice';


const Store = configureStore({
    reducer: {
        pinCode:reducer,
        todos: todoReducer,
    }
})
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store
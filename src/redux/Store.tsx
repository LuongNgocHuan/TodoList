import { configureStore } from "@reduxjs/toolkit";
import reducer from "./Reducer";


const Store = configureStore({
    reducer: {
        pinCode:reducer
    }
})
export type RootState = ReturnType<typeof Store.getState>;


export default Store
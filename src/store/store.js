import { configureStore } from "@reduxjs/toolkit";
import routineSlice from "./features/routineSlice";
export const store = configureStore({
    reducer: {
        routine: routineSlice.reducer,
    },
});
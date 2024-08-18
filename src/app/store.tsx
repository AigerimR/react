import { configureStore } from "@reduxjs/toolkit";
import form1SliceReducer from "./slices/form1Slice";

export const store = configureStore({
  reducer: {
    form1Values: form1SliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

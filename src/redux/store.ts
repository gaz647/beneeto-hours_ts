import { configureStore } from "@reduxjs/toolkit";
import hoursReducer from "./hours";

const store = configureStore({
  reducer: {
    hours: hoursReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

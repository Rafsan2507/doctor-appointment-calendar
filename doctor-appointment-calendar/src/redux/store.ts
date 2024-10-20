import { configureStore } from "@reduxjs/toolkit";
import { AppointmentSlice } from "./AppointmentSlice/AppointmentSlice";


export const store = configureStore({
  reducer: {
    appoints: AppointmentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
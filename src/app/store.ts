import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authSlice from "../features/auth/authSlice";
import darkModeSlice from "../features/darkMode/darkModeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    lightDark: darkModeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

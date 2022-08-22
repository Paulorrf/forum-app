import { createSlice } from "@reduxjs/toolkit";

const local: string | null = localStorage.getItem("auth");

//if localstorage is empty, all states are null
const initialState = {
  username: local === null ? null : JSON.parse(local).username,
  email: local === null ? null : JSON.parse(local).email,
  token: local === null ? null : JSON.parse(local).token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //payload will be = [username, email, token]
    setUser(state, { payload }: { payload: Array<string | null> }) {
      state.username = payload[0];
      state.email = payload[1];
      state.token = payload[2];
    },
    logout(state) {
      state.username = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

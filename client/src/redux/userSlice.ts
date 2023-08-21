// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Part 2
export interface UserInitialState {
  username: string;
}
const initialState: UserInitialState = {
  username: "",
};

// Part 3
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    removeUsername: (state) => {
      state.username = "";
    },
  },
});

// Part 4
export const { addUsername, removeUsername } = userSlice.actions;
export default userSlice.reducer;

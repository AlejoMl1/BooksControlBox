import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserInitialState {
  username: string;
  userUuid: string;
}

const initialState: UserInitialState = {
  username: "",
  userUuid: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserCredentials: (state, action: PayloadAction<UserInitialState>) => {
      state.username = action.payload.username;
      state.userUuid = action.payload.userUuid;
    },
    removeUserCredentials: (state) => {
      state.username = "";
      state.userUuid = "";
    },
  },
});

export const { addUserCredentials, removeUserCredentials } = userSlice.actions;
export default userSlice.reducer;

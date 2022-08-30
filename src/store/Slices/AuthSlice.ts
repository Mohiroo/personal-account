import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string;
  auth: boolean;
}

const initialState: AuthState = {
  user: "",
  auth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    approveAuthorization(state, action: PayloadAction<string>) {
      state.user = action.payload;
      state.auth = true;
    },
    rejectAuthorization(state) {
      state.user = "";
      state.auth = false;
    },
  },
});

export default authSlice.reducer;

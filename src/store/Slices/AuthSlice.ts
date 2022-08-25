import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  name: string;
  auth: boolean;
}

const initialState: AuthState = {
  name: "",
  auth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    approveAuthorization(state, action: PayloadAction<string>) {
      state.name = action.payload
      state.auth = true
    },
    rejectAuthorization(state){
      state.name = ''
      state.auth = false
    }
  },
});

export default authSlice.reducer;
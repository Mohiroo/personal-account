import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string;
  userId: string;
  auth: boolean;
}

interface PayloadActionState {
  user: string;
  userId: string;
}

const initialState: AuthState = {
  user: "",
  userId: "",
  auth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    approveAuthorization(state, action: PayloadAction<PayloadActionState>) {
      state.user = action.payload.user;
      state.userId = action.payload.userId;
      state.auth = true;
    },
    rejectAuthorization(state) {
      state.user = "";
      state.userId = "";
      state.auth = false;
    },
  },
});

export default authSlice.reducer;

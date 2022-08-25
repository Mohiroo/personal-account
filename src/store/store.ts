import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserAPI } from "./API/UserAPI";
import authReducer from "./Slices/AuthSlice";

const rootReducer = combineReducers({
  authReducer,
  [UserAPI.reducerPath]: UserAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(UserAPI.middleware),
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { commentsReducer } from "./commentsSlice";

const rootReducer = combineReducers({
  commentsReducer,
});

export const appStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof appStore>;
export type AppDispatch = AppStore["dispatch"];

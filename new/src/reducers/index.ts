import { userInfoReducer } from "./userInfoReducer";
import { pageWidthReducer } from "./pageWidthReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mypageReducer } from "./mypageReducer";
import { appReducer } from "./appReducer";
const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  pageWidth: pageWidthReducer,
  mypageReducer,
  appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;

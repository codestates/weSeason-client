import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userInfoReducer } from "./reducers/userInfoReducer";
import { pageWidthReducer } from "./reducers/pageWidthReducer";
import { accessTokenReducer } from "./reducers/accessTokenReducer";

const RootReducer = combineReducers({
  userInfo: userInfoReducer,
  pageWidth: pageWidthReducer,
  accessToken: accessTokenReducer,
});

const store = configureStore({
  reducer: RootReducer,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

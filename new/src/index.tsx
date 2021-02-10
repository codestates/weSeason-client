import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userInfoReducer } from "./reducers/userInfoReducer";

const RootReducer = combineReducers({
  userInfo: userInfoReducer,
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

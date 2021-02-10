import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./reducers/appReducer";

const RootReducer = combineReducers({
  appReducer
  
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

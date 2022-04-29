import { combineReducers, configureStore } from "@reduxjs/toolkit";
import login from "./login";
import photos from "./photos";
import setLocalStorage from "./middleware/setLocalStorage";

const reducer = combineReducers({ login, photos });

const store = configureStore({
  reducer,
  middleware: (middlewares) => [...middlewares(), setLocalStorage],
});

export default store;

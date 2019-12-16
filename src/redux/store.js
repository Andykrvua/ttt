import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import TodoListReducer from "./TodoListReducer";
import AdminReducer from "./AdminReducer";

let reducers = combineReducers({
  // profilePage: profileReducer,
  // dialogPage: dialogsReducer,
  // sidebar: sidebarReducer,
  Admin: AdminReducer,
  TodoList: TodoListReducer
});

let store = createStore(reducers, applyMiddleware(logger));

window.store = store;

export default store;

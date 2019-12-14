import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
// import profileReducer from './profile-reducer';
// import dialogsReducer from './dialogs-reducer';
// import sidebarReducer from './sidebar-reducer';
// import usersReducer from './users-reducer';
import TodoListReducer from "./TodoListReducer";

let reducers = combineReducers({
  // profilePage: profileReducer,
  // dialogPage: dialogsReducer,
  // sidebar: sidebarReducer,
  // usersPage: usersReducer
  TodoList: TodoListReducer
});

let store = createStore(reducers, applyMiddleware(logger));

window.store = store;

export default store;

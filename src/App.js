import React from "react";
import TodoList from "./Todo/TodoList";
import AddTodo from "./Todo/AddTodo";
import Admin from "./Todo/Admin";

function App() {
  return (
    <div className="wrapper">
      <Admin />
      <h1>Todo list</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;

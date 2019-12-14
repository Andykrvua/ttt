import React from "react";
import TodoList from "./Todo/TodoList";
import AddTodo from "./Todo/AddTodo";

function App() {
  return (
    <div className="wrapper">
      <h1>Todo list</h1>
      <AddTodo />
      <div>Сортировка</div>
      <TodoList />
    </div>
  );
}

export default App;

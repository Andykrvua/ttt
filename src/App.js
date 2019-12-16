import React from "react";
import TodoList from "./Todo/TodoList";
import AddTodo from "./Todo/AddTodo";
import Admin from "./Todo/Admin";

function App() {
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <ul className="right">
            <Admin />
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12">
              <h2>Todo list</h2>
              <TodoList />
              <h3>Add todo</h3>
              <AddTodo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

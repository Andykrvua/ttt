import React, { useState } from "react";
import PropTypes from "prop-types";
import { addTodoAC } from "./../redux/TodoListReducer";
import { connect } from "react-redux";

function AddTodo(props) {
  const [username, setUserName] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");

  let val;

  function simpleError(val) {
    let error = val;
    return error;
  }
  simpleError((val = false));

  function submitHandler(event) {
    event.preventDefault();
    let data = { text, username, email };
    if (text === "") {
      console.log("dddd");
      simpleError(true);
    } else {
      props.addTodo(data);
    }
    setText("");
    setUserName("");
    setEmail("");
  }

  return (
    <>
      {simpleError() ? <div>Ошибка</div> : <p>No todos!</p>}

      <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
        <textarea
          value={text}
          onChange={event => setText(event.target.value)}
          placeholder="Task"
        />
        <input
          value={username}
          onChange={event => setUserName(event.target.value)}
          placeholder="User name"
        />
        <input
          onChange={event => setEmail(event.target.value)}
          value={email}
          placeholder="email"
        />
        <button type="submit">Add todo</button>
      </form>
    </>
  );
}

let mapStateToProps = state => {
  return {
    // TodoList: state.TodoList.todos
    TodoList: state.TodoList.message.tasks
  };
};
let mapDispatchToProps = dispatch => {
  return {
    addTodo: data => {
      dispatch(addTodoAC(data));
    }
  };
};

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);

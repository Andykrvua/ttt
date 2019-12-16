import React, { useState } from "react";
import PropTypes from "prop-types";
import { addTodoAC, checkData } from "./../redux/TodoListReducer";
import { connect } from "react-redux";
import validateEmail from "../utils/Validate";
import * as axios from "axios";

function AddTodo(props) {
  const [username, setUserName] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");

  function createTask() {
    let createTaskUrl =
      "https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=andrey";

    var form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("text", text);

    axios.post(createTaskUrl, form).then(function(response) {
      console.log(response);
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    props.checkData(null);
    setUserName(username.trim());
    setText(text.trim());

    if (text === "" || username === "" || email === "") {
      props.checkData("All fields is required");
    } else if (!validateEmail(email)) {
      props.checkData("Email not valid");
    } else {
      createTask();
      props.checkData("Task added");
      setText("");
      setUserName("");
      setEmail("");
    }
  }
  // debugger;
  return (
    <>
      {props.checkVal}

      <div className="row">
        <form className="col s12" onSubmit={submitHandler}>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="textarea1"
                className="materialize-textarea"
                value={text}
                onChange={event => setText(event.target.value)}
              />
              <label htmlFor="textarea1">Task</label>
            </div>

            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                value={username}
                onChange={event => setUserName(event.target.value)}
              />
              <label htmlFor="icon_prefix">Username</label>
            </div>

            <div className="input-field col s6">
              <i className="material-icons prefix">phone</i>
              <input
                id="icon_telephone"
                type="text"
                className="validate"
                onChange={event => setEmail(event.target.value)}
                value={email}
              />
              <label htmlFor="icon_telephone">Email</label>
            </div>
          </div>
        </form>
      </div>

      {props.checkVal}
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
          // type="email"
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
    TodoList: state.TodoList.message.tasks,
    checkVal: state.TodoList.checkData
  };
};
let mapDispatchToProps = dispatch => {
  return {
    addTodo: data => {
      dispatch(addTodoAC(data));
    },
    checkData: val => {
      dispatch(checkData(val));
    }
  };
};

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);

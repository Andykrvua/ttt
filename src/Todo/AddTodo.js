import React, { useState } from "react";
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

            <div className="input-field col s4">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="icon_prefix2"
                type="text"
                className="validate"
                value={username}
                onChange={event => setUserName(event.target.value)}
              />
              <label htmlFor="icon_prefix2">Username</label>
            </div>

            <div className="input-field col s4">
              <i className="material-icons prefix">email</i>
              <input
                id="icon_telephone2"
                type="text"
                className="validate"
                onChange={event => setEmail(event.target.value)}
                value={email}
              />
              <label htmlFor="icon_telephone2">Email</label>
            </div>

            <div className="input-field col s4">
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

let mapStateToProps = state => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);

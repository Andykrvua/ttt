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

  // let baseUrl = `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=andrey&page=${props.currentPage}&sort_field=${props.sortField}&sort_direction=${props.sortOrder}`;

  // createTask(() => {
  //   axios.post(baseUrl, {username, email, text}).then((response) => {
  //     console.log(response.data);
  //     console.log(response.status);
  //     console.log(response.statusText);
  //     console.log(response.headers);
  //     console.log(response.config);
  //   });
  // },);
  function createTask() {
    let createPostUrl =
      "https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=andrey";

    // let formData2 = { username, text, email };
    // let form = JSON.stringify(formData2);

    var form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("text", text);

    fetch(createPostUrl, {
      method: "POST",
      body: form
      // mimeType: "multipart/form-data",
      // headers: {
      //   "Content-Type": false
      // }
    })
      .then(r => r.json())
      .then(data => {
        console.log(data);
      });

    // postData(
    //   "https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=andrey",
    //   { username, text, email }
    // )
    //   .then(data => console.log(JSON.stringify(data))) // JSON-строка полученная после вызова `response.json()`
    //   .catch(error => console.error(error));

    // function postData(url = "", data = {}) {
    //   // Значения по умолчанию обозначены знаком *
    //   return fetch(url, {
    //     method: "POST", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, cors, *same-origin
    //     credentials: "same-origin", // include, *same-origin, omit
    //     headers: {
    //       "Content-Type": "application/json",
    //       mimeType: "multipart/form-data"
    //       // contentType: false,
    //       // processData: false,
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: JSON.stringify(data) // тип данных в body должен соответвовать значению заголовка "Content-Type"
    //   }).then(response => response.json()); // парсит JSON ответ в Javascript объект
    // }
  }

  function submitHandler(event) {
    event.preventDefault();
    props.checkData(null);
    setUserName(username.trim());
    setText(text.trim());
    let data = { text, username, email };
    console.log(
      "text= " + text + " " + "username " + username + " " + "email " + email
    );
    if (text === "" || username === "" || email === "") {
      props.checkData("All fields is required");
    } else if (!validateEmail(email)) {
      props.checkData("Email not valid");
    } else {
      // props.addTodo(data);
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

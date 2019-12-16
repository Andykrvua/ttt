import React, { useState } from "react";
import { connect } from "react-redux";

function Admin() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    let createPostUrl =
      "https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=andrey";

    var form = new FormData();
    form.append("username", username);
    form.append("password", password);

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
  }

  function submitHandler(event) {
    event.preventDefault();
    // props.checkData(null);
    // if (text === "" || username === "" || email === "") {
    //   props.checkData("All fields is required");
    // } else if (!validateEmail(email)) {
    //   props.checkData("Email not valid");
    // } else {
    // props.addTodo(data);
    login();
    //   props.checkData("Task added");
    setUserName("");
    setPassword("");
  }
  //   }

  return (
    <div className="login_form">
      <form onSubmit={submitHandler}>
        <input
          value={username}
          onChange={event => setUserName(event.target.value)}
          placeholder="User name"
        />
        <input
          onChange={event => setPassword(event.target.value)}
          value={password}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Admin;

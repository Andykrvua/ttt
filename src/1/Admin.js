import React, { useState } from "react";
import { connect } from "react-redux";
import { isAdminAC } from "./../redux/TodoListReducer";
import { checkAdminData } from "./../redux/AdminReducer";
import * as axios from "axios";

function Admin(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    let loginUrl =
      "https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=andrey";

    var form = new FormData();
    form.append("username", username);
    form.append("password", password);

    axios.post(loginUrl, form).then(function(response) {
      console.log(response);
      console.log(response.data.message); //token
      if (response.data.status === "error") {
        props.checkAdminData("Wrong login or password");
      } else if (response.data.status === "ok") {
        props.checkAdminData("Hello Admin");
        props.isAdmin(response.data.message);
      }
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    props.checkAdminData(null);
    if (username === "" || password === "") {
      props.checkAdminData("All fields is required!");
      // } else if (!validateEmail(email)) {
      //   props.checkData("Email not valid");
      // } else {
    } else {
      login();
      //   props.checkData("Task added");
      setUserName("");
      setPassword("");
    }
  }

  return (
    <>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input id="icon_prefix" type="text" className="validate" />
              <label htmlFor="icon_prefix">First Name</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">phone</i>
              <input id="icon_telephone" type="tel" className="validate" />
              <label htmlFor="icon_telephone">Telephone</label>
            </div>
          </div>
        </form>
      </div>

      <div className="login_form">
        <h1>{props.checkAdminVal}</h1>
        {!props.Token ? (
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
        ) : (
          <button
            onClick={() => {
              props.isAdmin(false);
              props.checkAdminData("");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
}

let mapStateToProps = state => {
  return {
    // TodoList: state.TodoList.todos
    TodoList: state.TodoList.message.tasks,
    Token: state.TodoList.isAdmin,
    checkAdminVal: state.Admin.checkAdminData
  };
};
let mapDispatchToProps = dispatch => {
  return {
    checkAdminData: val => {
      dispatch(checkAdminData(val));
    },
    isAdmin: admin => {
      dispatch(isAdminAC(admin));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

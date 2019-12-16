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
    } else {
      login();
      setUserName("");
      setPassword("");
    }
  }

  return (
    <>
      <span className="login_message">{props.checkAdminVal}</span>
      <div className="row">
        {!props.Token ? (
          <form className="col s6 offset-s5" onSubmit={submitHandler}>
            <div className="row">
              <div className="input-field col s4">
                <i className="material-icons prefix">verified_user</i>
                <input
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  value={username}
                  onChange={event => setUserName(event.target.value)}
                />
                <label htmlFor="icon_prefix">Login</label>
              </div>
              <div className="input-field col s5">
                <i className="material-icons prefix">settings_ethernet</i>
                <input
                  id="icon_telephone"
                  type="text"
                  className="validate"
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                />
                <label htmlFor="icon_telephone">Password</label>
              </div>
              <div className="input-field col s3">
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                >
                  Submit Login
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button
            className="btn waves-effect waves-light logout_button"
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

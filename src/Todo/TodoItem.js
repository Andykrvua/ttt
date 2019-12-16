import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toogleTodoItemAC, adminEditedTextAC } from "../redux/TodoListReducer";
import isAdminAC from "./../redux/AdminReducer";
import * as axios from "axios";

const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: {
    marginRight: "1rem"
  }
};

function TodoItem(props) {
  let [taskText, setTaskText] = useState(props.task.text);

  console.log(taskText);
  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  let statusChangeUrl = `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${props.task.id}?developer=andrey`;

  function changeStatus() {
    var form = new FormData();
    if (props.task.status == 10) {
      var newStatus = 0;
    } else {
      var newStatus = 10;
    }
    form.append("status", newStatus);
    for (var i in props.Token) {
      var tokenI = i;
      var tokenVal = props.Token[i];
    }
    form.append("token", tokenVal);
    console.log(props.Token);

    axios.post(statusChangeUrl, form).then(function(response) {
      console.log(response);
      if (response.data.status === "error") {
        console.log("error");
      } else if (response.data.status === "ok") {
        props.toggle(props.task.id);
      }
    });
  }

  function changeTask() {
    if (props.task.text == taskText) {
      return;
    }
    var form = new FormData();
    let sendText = taskText + " Edited by admin";
    form.append("text", sendText);
    for (var i in props.Token) {
      var tokenI = i;
      var tokenVal = props.Token[i];
    }
    form.append("token", tokenVal);

    axios.post(statusChangeUrl, form).then(function(response) {
      console.log(response);
      if (response.data.status === "error") {
        console.log("error");
        props.isAdmin("!!!!!!");
      } else if (response.data.status === "ok") {
        // props.adminEditedText(props.task.id, sendText);
        console.log(props.TodoList);
        setTaskText(sendText);
      }
    });
  }

  const classes = [];

  if (props.task.status == 10) {
    classes.push("done");
  }

  return (
    <div className="collection">
      <li className="collection-item" style={styles.li}>
        <span className={classes.join(" ")}>
          {!props.Token ? (
            <input
              disabled
              type="checkbox"
              checked={props.task.status == 10}
              style={styles.input}
              // onChange={() => props.toggle(props.task.id)}
            />
          ) : (
            <input
              type="checkbox"
              checked={props.task.status == 10}
              style={styles.input}
              onChange={() => changeStatus()}
            />
          )}
          <strong>{props.task.id}</strong>
          &nbsp;
          {!props.Token ? (
            props.task.text
          ) : (
            <textarea
              value={taskText}
              onChange={event => setTaskText(event.target.value)}
              onBlur={() => changeTask()}
            />
          )}
        </span>
        <span>{props.task.username}</span>
        <span>{props.task.email}</span>
      </li>
    </div>
  );
}

let mapStateToProps = state => {
  return {
    // TodoList: state.TodoList.todos
    TodoList: state.TodoList.message.tasks,
    // TodoItem: state.task,
    Token: state.TodoList.isAdmin
  };
};
let mapDispatchToProps = dispatch => {
  return {
    toggle: id => {
      dispatch(toogleTodoItemAC(id));
    },
    adminEditedText: (id, text) => {
      dispatch(adminEditedTextAC(id, text));
    },
    isAdmin: admin => {
      dispatch(isAdminAC(admin));
    }
  };
};

TodoItem.propTypes = {
  // todo: PropTypes.object.isRequired,
  index: PropTypes.number
  // onChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

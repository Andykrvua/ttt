import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toogleTodoItemAC, adminEditedTextAC } from "../redux/TodoListReducer";
import isAdminAC from "./../redux/AdminReducer";
import * as axios from "axios";

const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "150px",
    position: "relative"
  },
  input: {
    marginRight: "1rem"
  },
  textarea: {
    border: "1px solid #e0e0e0",
    borderRadius: "2px"
  },
  label: {
    position: "absolute",
    top: "20px",
    left: "20px"
  },
  strong: {
    position: "absolute",
    top: "20px",
    left: "60px"
  }
};

function TodoItem(props) {
  let [taskText, setTaskText] = useState(props.task.text);

  let statusChangeUrl = `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${props.task.id}?developer=andrey`;

  function changeStatus() {
    var form = new FormData();
    if (props.task.status == 10) {
      var newStatus = 0;
    } else {
      var newStatus = 10;
    }
    form.append("status", newStatus);
    form.append("token", props.Token);

    axios.post(statusChangeUrl, form).then(function(response) {
      //  console.log(response);
      if (response.data.status === "error") {
        //  console.log("error");
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
    form.append("token", props.Token);

    axios.post(statusChangeUrl, form).then(function(response) {
      // console.log(response);
      if (response.data.status === "error") {
        console.log("error");
        // props.isAdmin("!!!!!!");
      } else if (response.data.status === "ok") {
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
            <label style={styles.label}>
              <input
                type="checkbox"
                disabled
                checked={props.task.status == 10}
                style={styles.input}
              />
              <span></span>
            </label>
          ) : (
            <label style={styles.label}>
              <input
                type="checkbox"
                checked={props.task.status == 10}
                style={styles.input}
                onChange={() => changeStatus()}
              />
              <span></span>
            </label>
          )}
          <strong style={styles.strong}>{props.task.id}</strong>

          {!props.Token ? (
            props.task.text
          ) : (
            <textarea
              style={styles.textarea}
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
    TodoList: state.TodoList.message.tasks,
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

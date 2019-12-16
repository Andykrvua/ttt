import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  removeTodoAC,
  toogleTodoItemAC,
  adminEditedTextAC,
  setTodoListAC
} from "../redux/TodoListReducer";
import {
  setCurPageAC,
  sortFieldAC,
  sortOrderAC
} from "./../redux/TodoListReducer";
import * as axios from "axios";

const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: ".5rem"
  },
  input: {
    marginRight: "1rem"
  }
};

// function TodoItem({ todo, onChange, removeTodo }) {
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
    form.append("token", props.Token);
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
    var form = new FormData();
    let sendText = taskText;
    sendText += " Edited by admin";
    form.append("text", sendText);
    form.append("token", props.Token);

    axios.post(statusChangeUrl, form).then(function(response) {
      console.log(response);
      if (response.data.status === "error") {
        console.log("error");
      } else if (response.data.status === "ok") {
        props.adminEditedText(props.task.id, sendText);
        console.log(props.TodoList);
      }
    });
  }

  const classes = [];

  if (props.task.status == 10) {
    classes.push("done");
  }

  return (
    <li style={styles.li}>
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
      <button
        className="rm"
        onClick={props.removeTodo.bind(null, props.task.id)}
      >
        &times;
      </button>
    </li>
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
    removeTodo: id => {
      dispatch(removeTodoAC(id));
    },
    toggle: id => {
      dispatch(toogleTodoItemAC(id));
    },
    adminEditedText: (id, text) => {
      dispatch(adminEditedTextAC(id, text));
    }
  };
};

TodoItem.propTypes = {
  // todo: PropTypes.object.isRequired,
  index: PropTypes.number
  // onChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

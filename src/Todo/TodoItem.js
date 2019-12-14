import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeTodoAC, toogleTodoItemAC } from "../redux/TodoListReducer";

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
  const classes = [];

  if (props.task.status == 10) {
    classes.push("done");
  }

  return (
    <li style={styles.li}>
      <span className={classes.join(" ")}>
        <input
          type="checkbox"
          checked={props.task.status == 10}
          style={styles.input}
          onChange={() => props.toggle(props.task.id)}
        />
        <strong>{props.task.id}</strong>
        &nbsp;
        {props.task.text}
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
    TodoList: state.TodoList.message.tasks
  };
};
let mapDispatchToProps = dispatch => {
  return {
    removeTodo: id => {
      dispatch(removeTodoAC(id));
    },
    toggle: id => {
      dispatch(toogleTodoItemAC(id));
    }
  };
};

TodoItem.propTypes = {
  // todo: PropTypes.object.isRequired,
  index: PropTypes.number
  // onChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

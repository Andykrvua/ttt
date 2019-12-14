import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTodoListAC, toogleTodoItemAC } from "../redux/TodoListReducer";
import * as axios from "axios";

const styles = {
  ul: {
    listStyle: "none",
    margin: "0",
    padding: "0"
  }
};

function TodoList(props) {
  // let todos = [
  //   {
  //     id: 1,
  //     completed: false,
  //     title: "Купить хлеб",
  //     user: "Vasya1",
  //     email: "1@test.com"
  //   },
  //   {
  //     id: 2,
  //     completed: true,
  //     title: "Купить молоко",
  //     user: "Petya2",
  //     email: "ddd@test.com"
  //   },
  //   {
  //     id: 3,
  //     completed: false,
  //     title: "Купить воды",
  //     user: "Dima3",
  //     email: "745@test.com"
  //   }
  // ];
  // if (!props.isReady) {
  //   props.fetchUsers(todos);
  // }

  useEffect(() => {
    if (props.TodoList.length === 0) {
      axios.get("http://localhost:8080/list2.json").then(response => {
        props.fetchUsers(response.data.message.tasks);
      });
    }
  }, [props]);
  // useEffect(() => {
  //   fetch("http://localhost:8080/list2.json")
  //     .then(response => response.json())
  //     .then(todoData => props.fetchUsers(todoData));
  // }, []);

  return (
    <ul style={styles.ul}>
      {props.TodoList.map((task, index) => {
        return (
          <TodoItem
            key={task.id}
            index={index}
            task={task}
            // onChange={props.onToggle}
            // onChange={props.toggle}
          />
        );
      })}
    </ul>
  );
}

let mapStateToProps = state => {
  return {
    TodoList: state.TodoList.message.tasks,
    isReady: state.TodoList.isReady
  };
};
let mapDispatchToProps = dispatch => {
  return {
    fetchUsers: todoData => {
      dispatch(setTodoListAC(todoData));
    },
    toggle: id => {
      dispatch(toogleTodoItemAC(id));
    }
  };
};

TodoList.propTypes = {
  toggle: PropTypes.func.isRequired,
  TodoList: PropTypes.array.isRequired
  // isReady: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setTodoListAC,
  toogleTodoItemAC,
  setCurPageAC,
  sortFieldAC,
  sortOrderAC
} from "../redux/TodoListReducer";
import * as axios from "axios";
import Loader from "../utils/Loader";

const styles = {
  ul: {
    listStyle: "none",
    margin: "0",
    padding: "0"
  },
  activepage: {
    fontWeight: "bold"
  }
};

function TodoList(props) {
  let baseUrl = `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=andrey&page=${props.currentPage}&sort_field=${props.sortField}&sort_direction=${props.sortOrder}`;

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      props.fetchUsers(response.data.message);
    });
  }, [props.currentPage, props.sortField, props.sortOrder, props.update]);

  let totalPage = Math.ceil(props.totalTask / props.pageSize);
  let pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <>
      <div className="row">
        <div className="col s6">
          <h5>Sort by</h5>
          <div className="collection">
            <a
              href="#"
              className="collection-item"
              onClick={() => {
                props.sortF("id");
              }}
            >
              Id
            </a>
            <a
              href="#"
              className="collection-item"
              onClick={() => {
                props.sortF("username");
              }}
            >
              Username
            </a>
            <a
              href="#"
              className="collection-item"
              onClick={() => {
                props.sortF("email");
              }}
            >
              Email
            </a>
            <a
              href="#"
              className="collection-item"
              onClick={() => {
                props.sortF("status");
              }}
            >
              Status
            </a>
          </div>
        </div>

        <div className="col s6">
          <h5>Order by</h5>
          <div className="collection">
            <a
              href="#"
              className="collection-item"
              onClick={() => {
                props.sortO("asc");
              }}
            >
              Asc
            </a>
            <a
              href="#"
              className="collection-item"
              onClick={() => {
                props.sortO("desc");
              }}
            >
              Desc
            </a>
          </div>
        </div>
      </div>

      {!props.isReady ? (
        <Loader />
      ) : (
        <ul className="pagination" style={styles.ul}>
          {props.TodoList.map((task, index) => {
            return <TodoItem key={task.id} index={index} task={task} />;
          })}

          {pages.map((p, i) => {
            return (
              <li
                // className="waves-effect"
                className={props.currentPage == p && "active"}
                key={i}
                onClick={() => {
                  props.paginator(p);
                }}
              >
                <a href="#">{p}</a>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

let mapStateToProps = state => {
  return {
    TodoList: state.TodoList.message.tasks,
    isReady: state.TodoList.isReady,
    totalTask: state.TodoList.message.total_task_count,
    pageSize: state.TodoList.pageSize,
    currentPage: state.TodoList.currentPage,
    sortField: state.TodoList.sortField,
    sortOrder: state.TodoList.sortOrder
  };
};
let mapDispatchToProps = dispatch => {
  return {
    fetchUsers: todoData => {
      dispatch(setTodoListAC(todoData));
    },
    toggle: id => {
      dispatch(toogleTodoItemAC(id));
    },
    paginator: pageN => {
      dispatch(setCurPageAC(pageN));
    },
    sortF: sortData => {
      dispatch(sortFieldAC(sortData));
    },
    sortO: sortOrderData => {
      dispatch(sortOrderAC(sortOrderData));
    }
  };
};

TodoList.propTypes = {
  toggle: PropTypes.func.isRequired,
  TodoList: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

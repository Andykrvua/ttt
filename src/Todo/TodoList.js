import React, { useEffect } from "react";
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
  }, [props.currentPage, props.sortField, props.sortOrder]);
  // useEffect(() => {
  //   if (props.TodoList.length === 0) {
  //     axios.get(baseUrl).then(response => {
  //       props.fetchUsers(response.data.message);
  //     });
  //   }
  // }, [props.currentPage]);
  // useEffect(() => {
  //   fetch("http://localhost:8080/list2.json")
  //     .then(response => response.json())
  //     .then(todoData => props.fetchUsers(todoData));
  // }, []);
  let totalPage = Math.ceil(props.totalTask / props.pageSize);
  let pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <>
      <div>
        <div>
          Порядок сортировки
          <br />{" "}
          <span
            onClick={() => {
              props.sortO("asc");
            }}
          >
            asc
          </span>
          <br />
          <span
            onClick={() => {
              props.sortO("desc");
            }}
          >
            desc
          </span>
        </div>
        <div>
          Cортировка по
          <br />
          <span
            onClick={() => {
              props.sortF("id");
            }}
          >
            id
          </span>
          <br />
          <span
            onClick={() => {
              props.sortF("username");
            }}
          >
            username
          </span>
          <br />
          <span
            onClick={() => {
              props.sortF("email");
            }}
          >
            email
          </span>
          <br />
          <span
            onClick={() => {
              props.sortF("status");
            }}
          >
            status
          </span>
          <br />
        </div>
      </div>
      {!props.isReady ? (
        <Loader />
      ) : (
        <ul style={styles.ul}>
          {props.TodoList.map((task, index) => {
            return <TodoItem key={task.id} index={index} task={task} />;
          })}
          <div>
            Pagination {props.totalTask}
            <br />
            Page size {props.pageSize}
            <br />
            Total Page {totalPage}
            <br />
            Current Page {props.currentPage}
            <br />
            {pages.map((p, i) => {
              return (
                <span
                  className={props.currentPage == p && "activepage"}
                  key={i}
                  onClick={() => {
                    props.paginator(p);
                  }}
                >
                  {p}
                </span>
              );
            })}
            {/* <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span> */}
          </div>
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

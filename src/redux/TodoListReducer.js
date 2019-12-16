let initialState = {
  message: {
    tasks: [],
    isAdmin: false,
    total_task_count: null
  },
  isReady: false,
  checkData: null,
  pageSize: 3,
  currentPage: 1,
  sortField: "id",
  sortOrder: "asc"
};

const TodoListReducer = (state = initialState, action) => {
  // debugger;
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        message: {
          tasks: [...action.todoData.tasks],
          // tasks: [...state.message.tasks, ...action.todoData.tasks],
          total_task_count: action.todoData.total_task_count
        },
        isReady: true
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.pageN
      };
    case "SET_TOGGLE":
      return {
        ...state,
        message: {
          tasks: state.message.tasks.map(todo => {
            if (todo.id === action.id) {
              if (todo.status == 10) {
                todo.status = 0;
              } else {
                todo.status = 10;
              }
            }
            return todo;
          })
        }
      };
    case "REMOVE_TODO":
      return {
        ...state,
        message: {
          tasks: state.message.tasks.filter(todo => todo.id !== action.id)
        }
      };

    case "ADD_TODO":
      let { text, username, email } = action.data;
      return {
        ...state,
        message: {
          tasks: [
            ...state.message.tasks,
            {
              id: state.message.tasks.length + 1,
              status: "0",
              text,
              username,
              email
            }
          ]
        }
      };

    case "CHECK_DATA":
      return {
        ...state,
        checkData: action.val
      };

    case "SORT_FIELD":
      return {
        ...state,
        sortField: action.sortData
      };
    case "SORT_ORDER":
      return {
        ...state,
        sortOrder: action.sortOrderData
      };
    default:
      return state;
  }
};

export const setTodoListAC = todoData => ({
  type: "SET_TODOS",
  todoData
});
export const setCurPageAC = pageN => ({
  type: "SET_CURRENT_PAGE",
  pageN
});
export const toogleTodoItemAC = id => ({
  type: "SET_TOGGLE",
  id
});
export const removeTodoAC = id => ({
  type: "REMOVE_TODO",
  id
});
export const addTodoAC = data => ({
  type: "ADD_TODO",
  data
});
export const checkData = val => ({
  type: "CHECK_DATA",
  val
});
export const sortFieldAC = sortData => ({
  type: "SORT_FIELD",
  sortData
});
export const sortOrderAC = sortOrderData => ({
  type: "SORT_ORDER",
  sortOrderData
});

export default TodoListReducer;

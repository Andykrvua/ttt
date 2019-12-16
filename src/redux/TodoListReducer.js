let initialState = {
  message: {
    tasks: [],
    //isAdmin: false,
    total_task_count: null
  },
  isReady: false,
  isAdmin: false,
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
        isReady: true,
        isAdmin: localStorage.getItem("token")
      };
    case "ADMIN_EDITED_TEXT":
      return {
        ...state,
        message: {
          tasks: state.message.tasks.map(todo => {
            if (todo.id === action.id) {
              todo.text = action.text;
            }
            return todo;
          })
        }
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
    case "IS_ADMIN":
      if (action.admin) {
        for (var i in action.admin) {
          var z1 = i;
          var z2 = action.admin[i];
        }
        localStorage.setItem(z1, z2);
      } else {
        localStorage.clear();
      }
      return {
        ...state,
        isAdmin: action.admin
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
export const isAdminAC = admin => ({
  type: "IS_ADMIN",
  admin
});
export const adminEditedTextAC = (id, text) => ({
  type: "ADMIN_EDITED_TEXT",
  id,
  text
});

export default TodoListReducer;

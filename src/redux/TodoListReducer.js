let initialState = {
  message: {
    tasks: [],
    isReady: false,
    isAdmin: false
  }
};

const TodoListReducer = (state = initialState, action) => {
  //   debugger;
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        message: {
          //   tasks: [...state.message.tasks, ...action.todoData.message.tasks]
          tasks: [...state.message.tasks, ...action.todoData]
        },
        isReady: true
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
    default:
      return state;
  }
};

export const setTodoListAC = todoData => ({
  type: "SET_TODOS",
  todoData
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

export default TodoListReducer;

let initialState = {
  checkAdminData: null
};

const AdminReducer = (state = initialState, action) => {
  // debugger;
  switch (action.type) {
    case "CHECK_ADMIN_DATA":
      return {
        ...state,
        checkAdminData: action.val
      };

    default:
      return state;
  }
};

export const checkAdminData = val => ({
  type: "CHECK_ADMIN_DATA",
  val
});

export default AdminReducer;

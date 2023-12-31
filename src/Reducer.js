export const initialState = {
  isLoading: false,
  users: [],
  isUserBlocked: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.status };

    case "SET_USERS_LIST":
      return { ...state, users: action.data };

    case "SET_USER_STATUS":
      const updatedList = state.users.map((user) => {
        if (user._id === action.userId) {
          user.isBlocked = action.status;
        }
        return user;
      });
      return { ...state, users: updatedList };

    case "SET_BLOCKED_TEXT_SHOW":
      return { ...state, isUserBlocked: true };

    default:
      return state;
  }
};

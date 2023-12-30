export const initialState = {
  isLoading: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.status };

    default:
      return state;
  }
};

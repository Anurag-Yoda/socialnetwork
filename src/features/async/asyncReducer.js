const initialState = {
  loading: false
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTION_STARTED":
      return {
        ...state,
        loading: true
      };
    case "ACTION_FINISHED":
      return {
        ...state,
        loading: false
      };
      case "ACTION_ERROR":
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default asyncReducer;
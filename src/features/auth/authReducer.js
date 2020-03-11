const initialState = {
  authenticated: false,
  currentUser: null
};

const authReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case "LOGIN_USER":
      return {
        authenticated: true,
        currentUser: payload.email
      };
    case "SIGN_OUT_USER":
      return {
        authenticated: false,
        currentUser: null
      };
    default:
      return state;
  }
};

export default authReducer;

const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  LoginData: {},
};

export const loginAction = (data) => {
  return { type: "LOG_IN", data };
};

export const logoutAction = () => {
  return { type: "LOG_OUT" };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        me: action.data,
        isLoggedIn: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;

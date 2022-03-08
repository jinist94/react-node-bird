const initialState = {
  isLoggedIn: false,
  isLoggingIn: false, // 로그인 시도중
  isLoggingOut: false, // 로그아웃 시도중
  me: null,
  signUpData: {},
  LoginData: {},
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const loginRequestAction = (data) => {
  return { type: LOG_IN_REQUEST, data };
};

export const logoutRequestAction = () => {
  return { type: LOG_OUT_REQUEST };
};

export const signupRequestAction = (data) => {
  return { type: "SIGN_UP_REQUEST", data };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      return {
        ...state,
        isLoggingIn: true,
      };
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        me: { ...action.data, nickname: "jay" },
        isLoggingIn: false,
        isLoggedIn: true,
      };
    case "LOG_IN_FAILURE":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggingOut: true,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    case "LOG_OUT_FAILURE":
      return {
        ...state,
        isLoggingOut: false,
      };
    case "SIGN_UP_REQUEST":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;

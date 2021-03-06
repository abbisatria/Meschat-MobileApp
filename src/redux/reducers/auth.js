const initialState = {
  token: null,
  user: null,
  message: '',
  errorMsg: '',
  tokenResetPassword: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        token: action.payload,
        user: action.user,
        message: action.message,
      };
    }
    case 'SIGN_UP': {
      return {
        ...state,
        token: action.payload,
        user: action.user,
        message: action.message,
      };
    }
    case 'FORGOT_PASSWORD': {
      return {
        ...state,
        tokenResetPassword: action.payload,
        message: action.message,
      };
    }
    case 'RESET_PASSWORD': {
      return {
        ...state,
        message: action.payload,
        tokenResetPassword: action.tokenResetPassword,
      };
    }
    case 'UPDATE_PROFILE': {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        message: action.message,
      };
    }
    case 'DELETE_PHOTO': {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        message: action.message,
      };
    }
    case 'SET_AUTH_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        token: null,
        user: null,
        message: '',
        errorMsg: '',
        tokenResetPassword: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default authReducer;

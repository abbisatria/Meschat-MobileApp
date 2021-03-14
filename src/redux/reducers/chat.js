const initialState = {
  listHistoryChat: [],
  historyChat: [],
  sender: '',
  message: '',
  errorMsg: '',
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_HISTORY_CHAT': {
      return {
        ...state,
        listHistoryChat: action.payload,
      };
    }
    case 'HISTORY_CHAT': {
      return {
        ...state,
        historyChat: action.payload,
      };
    }
    case 'SEND_CHAT': {
      return {
        ...state,
        message: action.payload,
      };
    }
    case 'SENDER': {
      return {
        ...state,
        sender: action.payload,
      };
    }
    case 'SET_CHAT_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default chatReducer;

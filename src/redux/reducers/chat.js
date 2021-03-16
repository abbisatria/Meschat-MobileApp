const initialState = {
  listHistoryChat: [],
  historyChat: [],
  pageInfoListHistoryChat: null,
  pageInfoHistoryChat: null,
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
        pageInfoListHistoryChat: action.pageInfo,
      };
    }
    case 'PAGING_LIST_HISTORY_CHAT': {
      const oldData = state.listHistoryChat;
      const newData = [...oldData, ...action.payload];
      return {
        ...state,
        listHistoryChat: newData,
        pageInfoListHistoryChat: action.pageInfo,
      };
    }
    case 'HISTORY_CHAT': {
      return {
        ...state,
        historyChat: action.payload,
        pageInfoHistoryChat: action.pageInfo,
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

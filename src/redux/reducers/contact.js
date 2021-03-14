const initialState = {
  results: [],
  pageInfo: null,
  errorMsg: '',
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_CONTACT': {
      return {
        ...state,
        results: action.payload,
        pageInfo: action.pageInfo,
      };
    }
    case 'SET_CONTACT_MESSAGE': {
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

export default contactReducer;

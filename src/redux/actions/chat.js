import http from '../../helpers/http';

export const listHistoryChat = (token, search, page, limit, sort, order) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: '',
      });
      const response = await http(token).get(
        `chat/list-history?search=${search ? search : ''}&limit=${
          limit ? limit : 8
        }&page=${page ? page : 1}&sort=${sort ? sort : 'id'}&order=${
          order ? order : 'DESC'
        }`,
      );
      dispatch({
        type: 'LIST_HISTORY_CHAT',
        payload: response.data.results,
        pageInfo: response.data.pageInfo,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: message,
      });
    }
  };
};

export const pagingListHistoryChat = (
  token,
  search,
  page,
  limit,
  sort,
  order,
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: '',
      });
      const response = await http(token).get(
        `chat/list-history?search=${search ? search : ''}&limit=${
          limit ? limit : 8
        }&page=${page ? page : 1}&sort=${sort ? sort : 'id'}&order=${
          order ? order : 'DESC'
        }`,
      );
      dispatch({
        type: 'PAGING_LIST_HISTORY_CHAT',
        payload: response.data.results,
        pageInfo: response.data.pageInfo,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: message,
      });
    }
  };
};

export const historyChat = (token, idReceiver, page) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('idReceiver', idReceiver);
    try {
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: '',
      });
      const response = await http(token).post(
        `chat/history?page=${page ? page : 1}`,
        params,
      );
      dispatch({
        type: 'HISTORY_CHAT',
        payload: response.data.results,
        pageInfo: response.data.pageInfo,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: message,
      });
    }
  };
};

export const pagingHistoryChat = (token, idReceiver, page) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('idReceiver', idReceiver);
    try {
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: '',
      });
      const response = await http(token).post(
        `chat/history?page=${page ? page : 1}`,
        params,
      );
      dispatch({
        type: 'PAGING_HISTORY_CHAT',
        payload: response.data.results,
        pageInfo: response.data.pageInfo,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: message,
      });
    }
  };
};

export const sendChat = (token, idReceiver, sendMessage) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('idReceiver', idReceiver);
    params.append('message', sendMessage);
    try {
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: '',
      });
      const response = await http(token).post('chat/send', params);
      dispatch({
        type: 'SEND_CHAT',
        payload: response.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: message,
      });
    }
  };
};

export const sender = (idSender) => ({
  type: 'SENDER',
  payload: idSender,
});

import http from '../../helpers/http';

export const listHistoryChat = (token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: '',
      });
      const response = await http(token).get('chat/list-history');
      dispatch({
        type: 'LIST_HISTORY_CHAT',
        payload: response.data.results,
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

export const historyChat = (token, idReceiver) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('idReceiver', idReceiver);
    try {
      dispatch({
        type: 'SET_CHAT_MESSAGE',
        payload: '',
      });
      const response = await http(token).post('chat/history', params);
      dispatch({
        type: 'HISTORY_CHAT',
        payload: response.data.results,
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

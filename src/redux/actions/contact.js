import http from '../../helpers/http';

export const getContact = (token, search, page, limit, sort, order) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_CONTACT_MESSAGE',
        payload: '',
      });
      const response = await http(token).get(
        `contact?search=${search ? search : ''}&limit=${
          limit ? limit : 7
        }&page=${page ? page : 1}&sort=${sort ? sort : 'id'}&order=${
          order ? order : 'ASC'
        }`,
      );
      dispatch({
        type: 'LIST_CONTACT',
        payload: response.data.results,
        pageInfo: response.data.pageInfo,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_CONTACT_MESSAGE',
        payload: message,
      });
    }
  };
};

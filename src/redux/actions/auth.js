import jwt from 'jwt-decode';
import http from '../../helpers/http';

export const login = (phoneNumber, password) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('phoneNumber', phoneNumber);
    params.append('password', password);
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: '',
      });
      const results = await http().post('auth/sign-in', params);
      const token = results.data.results.token;
      const user = jwt(token);
      dispatch({
        type: 'LOGIN',
        payload: token,
        user: user,
        message: results.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message,
      });
    }
  };
};

export const signUp = (phoneNumber, password) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('phoneNumber', phoneNumber);
    params.append('password', password);
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: '',
      });
      const results = await http().post('auth/sign-up', params);
      const token = results.data.results.token;
      const user = jwt(token);
      dispatch({
        type: 'SIGN_UP',
        payload: token,
        user: user,
        message: results.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message,
      });
    }
  };
};

export const forgotPassword = (phoneNumber) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('phoneNumber', phoneNumber);
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: '',
      });
      const results = await http().post('auth/forgot-password', params);
      dispatch({
        type: 'FORGOT_PASSWORD',
        payload: results.data.results,
        message: results.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message,
      });
    }
  };
};

export const resetPassword = (token, password) => {
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append('password', password);
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: '',
      });
      const results = await http().patch(
        `auth/reset-password/${token}`,
        params,
      );
      dispatch({
        type: 'RESET_PASSWORD',
        payload: results.data.message,
        tokenResetPassword: '',
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message,
      });
    }
  };
};

export const updateProfile = (token, id, data) => {
  return async (dispatch) => {
    const params = new FormData();
    if (data.username) {
      params.append('username', data.username);
    }
    if (data.phoneNumber) {
      params.append('phoneNumber', data.phoneNumber);
    }
    if (data.password) {
      params.append('password', data.password);
    }
    if (data.picture) {
      params.append('picture', data.picture);
    }
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: '',
      });
      const results = await http(token).patch(`user/${id}`, params);
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: results.data.results,
        message: results.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message,
      });
    }
  };
};

export const deletePhoto = (token, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: '',
      });
      const results = await http(token).patch(`user/delete-photo/${id}`);
      dispatch({
        type: 'DELETE_PHOTO',
        payload: results.data.results,
        message: results.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message,
      });
    }
  };
};

export const logout = () => ({
  type: 'LOGOUT',
});

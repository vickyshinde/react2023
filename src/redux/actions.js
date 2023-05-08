import axios from 'axios';
import * as types from './actionType';

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users
});

const userDeleted = () => ({
  type: types.DELETE_USER
});

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((resp) => {
        console.warn('resp', resp);
        dispatch(getUsers(resp.data));
      })
      .catch((error) => console.error(error.message));
  };
};

export const deleteUsers = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then((resp) => {
        console.log('resp', resp);
        dispatch(userDeleted());
        dispatch(loadUsers());
      })
      .catch((error) => console.error(error));
  };
};

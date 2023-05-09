import axios from 'axios';
import * as types from './actionType';

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users
});

const userDeleted = () => ({
  type: types.DELETE_USER
});

const userAdded = () => ({
  type: types.ADD_USER
});

const userUpdated = () => ({
  type: types.UPDATE_USER
});

const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user
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

export const userAdd = (user) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users`, user)
      .then((resp) => {
        console.warn('resp', resp);
        dispatch(userAdded());
      })
      .catch((error) => console.error(error.message));
  };
};

export const getSingleUsers = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then((resp) => {
        console.log('resp', resp);
        dispatch(getUser(resp.data));
      })
      .catch((error) => console.error(error));
  };
};

export const updateUser = (user, id) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API_URL}/users/${id}`, user)
      .then((resp) => {
        console.log('resp', resp);
        dispatch(userUpdated());
      })
      .catch((error) => console.error(error));
  };
};

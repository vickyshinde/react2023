import { APP_CONSTANTS } from '../components/appConstants';

const { API_USERS, API_URL } = APP_CONSTANTS;

export const getUsers = () => {
  const url = `${API_USERS}/users`;
  // console.log(url);
  return fetch(url);
};

export const getUsersAdv = (controller) => {
  const url = `${API_URL}/users?_page=${controller.currentPage}&_limit=${controller.rowsPerPage}&q=${controller.searchInput}&_sort=${controller.sortColumn}&_order=${controller.order}`;
  // console.log('url', url, controller);
  return fetch(url);
};

export const getOneUsersAdv = (id) => {
  const url = `${API_URL}/Users/${id}`;
  // console.log('url', url);
  return fetch(url);
};

export const editUser = (id, user) => {
  return fetch(`${API_URL}/Users/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

// Add User
export const addUser = (newUser) => {
  // console.log(newUser);
  return fetch(`${API_URL}/users`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  });
};

// same as get one user
export const deleteUser = (id) => {
  const url = `${API_URL}/Users/${id}`;
  // console.log('url', url);
  return fetch(url, {
    method: 'delete'
  });
};

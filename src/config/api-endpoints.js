import { APP_CONSTANTS } from '../components/appConstants';

const { API_USERS, API_URL, API_URL_MONGODB } = APP_CONSTANTS;
const usersApiEndPoint = `${API_URL}/Users/`;

export const getUsers = () => {
  const url = `${API_USERS}/users`;
  // console.log(url);
  return fetch(url);
};

export const getUsersAdv = (controller) => {
  const url = `${usersApiEndPoint}?_page=${controller.currentPage}&_limit=${controller.rowsPerPage}&q=${controller.searchInput}&_sort=${controller.sortColumn}&_order=${controller.order}`;
  // console.log('url', url, controller);
  return fetch(url);
};

export const getOneUsersAdv = (id) => {
  const url = `${usersApiEndPoint}/${id}`;
  // console.log('url', url);
  return fetch(url);
};

export const editUser = (id, user) => {
  const url = `${usersApiEndPoint}/${id}`;
  return fetch(url, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

// Add User
export const addUser = (newUser) => {
  const url = `${usersApiEndPoint}`;
  // console.log(newUser);
  return fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  });
};

// same as get one user
export const deleteUser = (id) => {
  const url = `${usersApiEndPoint}/${id}`;
  // console.log('url', url);
  return fetch(url, {
    method: 'delete'
  });
};

export const getUsersFromMongoDB = () => {
  const url = `http://localhost:5000/users`;
  console.log(API_URL_MONGODB);
  return fetch(url);
};

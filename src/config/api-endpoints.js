import { APP_CONSTANTS } from '../components/appConstants';

const { API_USERS, API_URL } = APP_CONSTANTS;

export const getUsers = async () => {
  const url = `${API_USERS}/users`;
  // console.log(url);
  return await fetch(url);
};

export const getUsersAdv = async (controller) => {
  const url = `${API_URL}/users?_page=${controller.currentPage}&_limit=${controller.rowsPerPage}&q=${controller.searchInput}&_sort=${controller.sortColumn}&_order=${controller.order}`;
  // console.log('url', url, controller);
  return await fetch(url);
};

export const getOneUsersAdv = async (id) => {
  const url = `${API_URL}/Users/${id}`;
  console.log('url', url);
  return await fetch(url);
};

export const editUser = async (id, user) => {
  return await fetch(`${API_URL}/Users/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

//Add User
export const addUser = async (newUser) => {
  console.log(newUser);
  return await fetch(`${API_URL}/users`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  });
};

// same as get one user
export const deleteUser = async (id) => {
  const url = `${API_URL}/Users/${id}`;
  console.log('url', url);
  return await fetch(url, {
    method: 'delete',
  });
};

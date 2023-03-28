import { APP_CONSTANTS } from '../components/appConstants';

const { API_USERS, API_URL } = APP_CONSTANTS;

export const getUsers = async () => {
  const url = `${API_USERS}/users`;
  console.log(url);
  return await fetch(url);
};

export const getUsersAdv = async (controller) => {
  // const url = `${API_URL}/users`;
  const url = `http://localhost:5000/Users?_page=${controller.page}&_limit=${controller.rowsPerPage}&q=${controller.searchInput}&_sort=${controller.sortColumn}&_order=${controller.order}`;
  console.log(url, controller);
  return await fetch(url);
};

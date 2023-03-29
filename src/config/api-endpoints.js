import { APP_CONSTANTS } from '../components/appConstants';

const { API_USERS, API_URL } = APP_CONSTANTS;

export const getUsers = async () => {
  const url = `${API_USERS}/users`;
  console.log(url);
  return await fetch(url);
};

export const getUsersAdv = async (controller) => {
  const url = `${API_URL}/users?_page=${controller.currentPage}&_limit=${controller.rowsPerPage}&q=${controller.searchInput}&_sort=${controller.sortColumn}&_order=${controller.order}`;
  console.log('url', url, controller);
  return await fetch(url);
};

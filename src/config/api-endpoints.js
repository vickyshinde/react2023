import { APP_CONSTANTS } from '../components/appConstants';

const { API_USERS } = APP_CONSTANTS;

export const getUsers = async () => {
  const url = `${API_USERS}/users`;
  console.log(url);
  return await fetch(url);
};

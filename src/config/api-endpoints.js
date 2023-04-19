import { APP_CONSTANTS } from '../components/appConstants';

const { API_USERS, API_URL, API_URL_MONGODB } = APP_CONSTANTS;
const usersApiEndPoint = `${API_URL}/Users/`;

//
const API_ENDPOINT = {
  getPlaceholderUsersApiEndpoint: `${API_USERS}/users`,
  getJsonServerUsersApiEndpoint: `${API_URL}/Users/`,

  setQueryParams(url, params) {
    console.log(params);
    if (params) {
      const paramArr = Object.keys(params).map((key) => `${key}=${params[key]}`);
      console.log(paramArr);
      const queryParams = paramArr.join('&');

      if (url.indexOf('?') === -1) {
        return `${url}?${queryParams}`;
      }
      return `${url}&${queryParams}`;
    }
    return url;
  }
};

export default API_ENDPOINT;
//

export const getUsersAdv = (controller) => {
  const {
    QUERY_STRING: { PAGE, LIMIT, QUERY, SORT, ORDER }
  } = APP_CONSTANTS;
  const { currentPage, rowsPerPage, searchInput, sortColumn, order } = controller;
  // const url = `${usersApiEndPoint}?_page=${currentPage}&_limit=${rowsPerPage}&q=${searchInput}&_sort=${sortColumn}&_order=${order}`;
  // console.log('url', url, controller);
  const apiUrl = API_ENDPOINT.setQueryParams(API_ENDPOINT.getJsonServerUsersApiEndpoint, {
    [PAGE]: encodeURIComponent(currentPage),
    [LIMIT]: encodeURIComponent(rowsPerPage),
    [QUERY]: encodeURIComponent(searchInput),
    [SORT]: encodeURIComponent(sortColumn),
    [ORDER]: encodeURIComponent(order)
  });
  console.log('apiUrl', apiUrl);
  return fetch(apiUrl);
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

export const getCategory = () => {
  const url = `${API_URL}/Category`;
  return fetch(url);
};
export const getSubCategory = (id) => {
  const url = `${API_URL}/Category/${id}`;
  return fetch(url);
};
export const getUsersFromMongoDB = () => {
  const url = `http://localhost:5000/users`;
  console.log(API_URL_MONGODB);
  return fetch(url);
};

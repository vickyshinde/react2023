import API_ENDPOINT from './api-endpoints';
import { sendRequest } from './commonMethod';

export const getPlaceholderUsers = async () => {
  const { getPlaceholderUsersApiEndpoint } = API_ENDPOINT;
  let responseData = {};

  try {
    responseData = await sendRequest('get', getPlaceholderUsersApiEndpoint);
    console.log('api-endpoint', getPlaceholderUsersApiEndpoint);
    console.log('getPlaceholderUsers func success', responseData);
  } catch (error) {
    console.log('getPlaceholderUsers func error', error);
    responseData = error;
  }

  return responseData;
};

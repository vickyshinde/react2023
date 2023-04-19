import API_ENDPOINT from './api-endpoints';
import { sendRequest } from './commonMethod';

export const getPlaceholderUsers = async () => {
  const { getPlaceholderUsersApiEndpoint } = API_ENDPOINT;
  let responseData = {};

  try {
    responseData = await sendRequest('get', getPlaceholderUsersApiEndpoint);
    console.log('api-endpoint', getPlaceholderUsersApiEndpoint);
    console.log('api-data', responseData);
  } catch (error) {
    console.log(error);
  }

  return responseData;
};

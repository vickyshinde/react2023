export const sendRequest = async (method, url, data = null) => {
  let responseData = {};
  // let isError;

  // Define the request options
  const requestOptions = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: data
  };

  // Send the request and handle the response
  try {
    const response = await fetch(url, requestOptions);

    console.log('sendRequest func success', response);

    responseData = await response.json();

    console.log('sendRequest func json()', responseData);

    if (!response.ok) {
      // eslint-disable-next-line no-throw-literal
      throw {
        statusCode: response.status,
        response
      };
    }
  } catch (error) {
    console.log('sendRequest func error', error);
    // isError = console.error();
    throw error;
  }

  return responseData;
};

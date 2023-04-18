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

    responseData = await response.json();

    console.log('commonMethod', responseData);

    if (!response.ok) {
      // eslint-disable-next-line no-throw-literal
      throw {
        statusCode: response.status,
        ...response
      };
    }
  } catch (error) {
    console.log(error);
    // isError = console.error();
    throw error;
  }

  return responseData;
};

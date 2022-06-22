async function requestApi(endPointApi) {
  try {
    // console.log(endPointApi);
    const response = await fetch(endPointApi);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export default requestApi;

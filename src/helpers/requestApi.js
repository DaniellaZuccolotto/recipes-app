async function requestApi(endPointApi) {
  try {
    const response = await fetch(endPointApi);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

export default requestApi;

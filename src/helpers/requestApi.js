async function requestApi(endPointApi) {
  try {
    const response = await fetch(endPointApi);
    const data = await response.json();
    return Object.values(data)[0];
  } catch (error) {
    console.log('Erro de Requisição', error);
    return error;
  }
}

export default requestApi;

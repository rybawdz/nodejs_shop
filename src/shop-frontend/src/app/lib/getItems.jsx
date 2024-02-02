export async function getItems(query) {
  const url = 'http://localhost:4040/api/v1/product/search?name=' + query;

  const response = await fetch(url, {
    method: 'GET',
  });
  const data = await response.json();
  if (response.status == 400) {
    throw new AuthError(data.message);
  }
  if (response.status == 500) {
    throw new Error('Server-side error');
  }
  return data;
}

export default getItems;
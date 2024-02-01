export async function getItems() {
  const url = 'http://localhost:4040/api/v1/product/search?name=';

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
  console.log('Response from server:', data);
  return response;
}

export default getItems;
export async function getData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('API 통신 에러');
  } catch (e) {
    console.error(e);
  }
}

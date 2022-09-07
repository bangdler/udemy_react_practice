export function getItem(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
  } catch (e) {
    console.error('parsing error', e);
  }
}

export function setItem(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

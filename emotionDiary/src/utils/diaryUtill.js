export const getStringDate = date => {
  const offset = date.getTimezoneOffset() * 60000;
  const offsetDate = new Date(date.getTime() - offset);
  return offsetDate.toISOString().slice(0, 10);
};

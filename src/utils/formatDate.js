export const formatDate = (isoDate) => {
  if (!isoDate) {
    return '';
  }

  const date = new Date(isoDate);

  if (isNaN(date)) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

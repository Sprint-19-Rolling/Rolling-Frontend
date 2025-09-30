export const formatDate = (isoDate) => {
  if (!isoDate) {
    return '';
  }

  const date = new Date(isoDate);
  const formatted = date.toISOString().split('T')[0].replace(/-/g, '.');

  return formatted;
};

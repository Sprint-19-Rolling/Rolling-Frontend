/**
 * ISO 형식의 UTC 날짜 문자열을 받아 'YYYY.MM.DD' 형식으로 포매팅합니다.
 * 한국 시간대(KST) 기준으로 자동 변환됩니다.
 * @param {string} isoDate - '2025-10-02T...' 형식의 UTC 문자열
 * @returns {string} 포매팅된 날짜 문자열 (예: '2025.10.02')
 */
export const formatDate = (isoDate) => {
  if (!isoDate) {
    return '';
  }

  const date = new Date(isoDate);

  if (isNaN(date)) {
    return '';
  }

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  };

  const parts = new Intl.DateTimeFormat('ko-KR', options).formatToParts(date);
  const year = parts.find(({ type }) => type === 'year').value;
  const month = parts.find(({ type }) => type === 'month').value;
  const day = parts.find(({ type }) => type === 'day').value;
  return `${year}.${month}.${day}`;
};

import { getRecipientData } from '@/apis/recipients';
import useDataFetch from '@/hooks/useDataFetch';

/**
 * 롤링페이퍼 수신자(Recipient)에 대한 데이터를 불러오는 커스텀 훅
 * @param {string} recipientId - 롤링페이퍼 수신자의 ID
 * @returns {{
 * recipientData: object | null,
 * setRecipientData: function,
 * loading: boolean
 * }}
 */
const useRecipientData = (recipientId) => {
  const fetcher = (signal) => getRecipientData(recipientId, signal);

  const { data, setData, loading } = useDataFetch(fetcher, [recipientId]);

  return { recipientData: data, setRecipientData: setData, loading };
};

export default useRecipientData;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { teamApi } from '@/apis/axios';
import useError from '@/hooks/useError';

/**
 * 롤링페이퍼 수신자(Recipient)에 대한 헤더 표시용 핵심 데이터를 불러오는 커스텀 훅입니다.
 *
 * @typedef {Object} RecipientData
 * @property {string} name - 수신자의 이름
 * @property {number} messageCount - 롤링페이퍼에 작성된 총 메시지 개수
 * @property {Array} recentMessages - 최근 작성된 메시지 작성자 요약 목록 (최대 3개)
 * @property {number} reactionCount - 총 반응(이모티콘) 개수
 * @property {Array} topReactions - 가장 많이 받은 이모티콘 목록 (최대 3개)
 *
 * @param {string} recipientId - 롤링페이퍼 수신자의 ID
 * @returns {{
 * recipient: RecipientData | null
 * setRecipientData: function(RecipientData | null)
 * loading: boolean
 * }} - 수신자 정보 객체와 로딩 상태를 반환
 */
const useRecipientHeaderData = (recipientId) => {
  const { setError } = useError();
  const [recipientData, setRecipientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipientId) {
      return;
    }

    const controller = new AbortController();

    setRecipientData(null);
    setError(null);
    setLoading(true);

    const fetchHeaderData = async () => {
      try {
        const recipientRes = await teamApi.get(`recipients/${recipientId}/`, {
          signal: controller.signal,
        });
        const data = {
          name: recipientRes.data.name,
          messageCount: recipientRes.data.messageCount,
          recentMessages: recipientRes.data.recentMessages,
          reactionCount: recipientRes.data.reactionCount,
          topReactions: recipientRes.data.topReactions,
        };
        setRecipientData(data);
      } catch (err) {
        if (axios.isCancel(err) || err.name === 'CanceledError') {
          return;
        }

        setError({
          status: err.response?.status || 500,
          message:
            err.response?.data?.message ||
            '헤더 데이터를 불러오는 데 실패했습니다.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();

    return () => {
      controller.abort();
    };
  }, [recipientId, setError]);

  return { recipientData, setRecipientData, loading };
};

export default useRecipientHeaderData;

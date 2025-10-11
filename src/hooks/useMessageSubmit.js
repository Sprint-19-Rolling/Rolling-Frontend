import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createMessage } from '@/apis/messageApi';
import useToast from '@/hooks/useToast';

/**
 * 메시지 제출을 관리하는 커스텀 훅
 * @param {string} recipient_id - 수신자 ID
 * @returns {Object} handleSubmit, isSubmitting, error
 */
export const useMessageSubmit = (recipient_id) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 🔥 useToast를 호출해야 훅의 return 값을 가져올 수 있음!
  const { showToast } = useToast();

  const handleSubmit = async (messageData) => {
    setError('');
    setIsSubmitting(true);

    try {
      const response = await createMessage(recipient_id, messageData);

      if (response.status === 201) {
        showToast('메시지가 성공적으로 생성되었습니다!', 'success');
        navigate(`/post/${recipient_id}`);
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    } catch (err) {
      console.error('❌ 메시지 생성 실패:', err);
      setError('메시지 생성에 실패했습니다. 다시 시도해주세요.');
      showToast('메시지 생성에 실패했습니다.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    error,
    setError,
  };
};

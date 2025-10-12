import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createMessage } from '@/apis/messages';
import useError from '@/hooks/useError';
import useToast from '@/hooks/useToast';

/**
 * 메시지 제출을 관리하는 커스텀 훅
 * @param {string} recipientId - 수신자 ID
 * @returns {Object} handleSubmit, isSubmitting, error, setError
 */
export const useMessageSubmit = (recipientId) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { error, setError } = useError();
  const { showToast } = useToast();

  const handleSubmit = async (messageData) => {
    setError('');
    setIsSubmitting(true);

    try {
      const response = await createMessage(recipientId, messageData, setError);

      if (response.status === 201) {
        showToast('메시지가 성공적으로 생성되었습니다!', 'success');
        navigate(`/post/${recipientId}`);
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

import { useState } from 'react';
import { postMessage } from '@/apis/messages';
import useToast from '@/hooks/useToast';

const usePostMessage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const submitMessage = async ({ recipientId, messageData, onSuccess }) => {
    try {
      setIsSubmitting(true);
      await postMessage({ recipientId, messageData });
      showToast('메시지가 성공적으로 전송되었습니다!');
      if (onSuccess) {
        onSuccess();
      }
    } catch {
      showToast('메시지 전송 중 오류가 발생했습니다.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitMessage };
};

export default usePostMessage;

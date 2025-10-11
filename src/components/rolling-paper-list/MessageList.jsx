import { useEffect, useRef, useState } from 'react';
import Modal from '@/components/common/modal/Modal';
import AddMessageCardButton from '@/components/rolling-paper-list/message-card/AddMessageCardButton';
import MessageCard from '@/components/rolling-paper-list/message-card/MessageCard';
import MessageCardSkeleton from '@/components/rolling-paper-list/message-card/MessageCardSkeleton';
import ToastContainer from '@/components/rolling-paper-list/toast/ToastContainer';
import { MESSAGE_LIST_SKELETON_ARRAY } from '@/constants/rollingPaperList';
import useMessages from '@/hooks/useMessages';
import useToast from '@/hooks/useToast';

/**
 * 특정 롤링페이퍼 ID에 해당하는 메시지 목록을 표시하고 관리하는 리스트 컴포넌트입니다.
 * @param {object} props
 * @param {string} props.recipientId - 롤링페이퍼 수신자의 ID
 * @param {boolean} [props.isEditPage=false] - 현재 페이지가 편집 모드인지 여부
 * @returns {JSX.Element}
 */
const MessageList = ({ recipientId, isEditPage = false }) => {
  const { showToast } = useToast();
  const {
    messages,
    loading,
    isFetching,
    nextUrl,
    fetchMore,
    deleteMessageById,
  } = useMessages(recipientId);

  const observerRef = useRef(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // 무한 스크롤
  useEffect(() => {
    if (loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextUrl && !isFetching) {
          fetchMore();
        }
      },
      { threshold: 1.0 }
    );

    const target = observerRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [nextUrl, fetchMore, loading, isFetching]);

  const handleMessageCardClick = (messageData) => {
    setSelectedMessage(messageData);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedMessage(null);
  };

  const handleMessageCardDelete = async (messageId) => {
    if (!isEditPage) {
      return;
    }

    const confirmDelete = window.confirm('정말 이 메시지를 삭제하시겠습니까?');
    if (!confirmDelete) {
      return;
    }

    try {
      const success = await deleteMessageById(messageId);
      if (success) {
        showToast('메시지가 삭제되었습니다.', 'success');
      } else {
        showToast('메시지 삭제에 실패했습니다. 다시 시도해주세요.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast(
        '삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        'error'
      );
    }
  };

  if (loading && !isFetching) {
    return (
      <div className="card-grid-style">
        {MESSAGE_LIST_SKELETON_ARRAY.map((_, index) => {
          return <MessageCardSkeleton key={index} />;
        })}
      </div>
    );
  }

  return (
    <>
      <div className="card-grid-style">
        {!isEditPage && <AddMessageCardButton id={recipientId} />}
        {messages.length > 0 &&
          messages.map((item) => {
            return (
              <MessageCard
                key={item.id}
                sender={item.sender}
                profileImageURL={item.profileImageURL}
                relationship={item.relationship}
                createdAt={item.createdAt}
                content={item.content}
                font={item.font}
                onClick={() => handleMessageCardClick(item)}
                {...(isEditPage
                  ? {
                      edit: true,
                      onDelete: () => handleMessageCardDelete(item.id),
                    }
                  : {})}
              />
            );
          })}

        <div ref={observerRef} className="h-2" />
        {isFetching && (
          <div className="p-2 text-center text-gray-900">
            📝 롤링페이퍼 메시지를 불러오는 중...
          </div>
        )}
      </div>

      {isOpenModal && selectedMessage && (
        <Modal
          isOpen={isOpenModal}
          onClose={handleCloseModal}
          contentHtml={selectedMessage.content}
          sender={selectedMessage.sender}
          role={selectedMessage.relationship}
          profileImgUrl={selectedMessage.profileImageURL}
          createdAt={selectedMessage.createdAt}
          font={selectedMessage.font}
        />
      )}
    </>
  );
};

export default MessageList;

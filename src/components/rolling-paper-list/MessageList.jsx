import { useEffect, useRef, useState } from 'react';
import Error from '@/components/common/Error';
import Modal from '@/components/common/modal/Modal';
import AddMessageCardButton from '@/components/rolling-paper-list/message-card/AddMessageCardButton';
import MessageCard from '@/components/rolling-paper-list/message-card/MessageCard';
import MessageCardSkeleton from '@/components/rolling-paper-list/message-card/MessageCardSkeleton';
import { MESSAGE_LIST_SKELETON_ARRAY } from '@/constants/rollingPaperList';
import useError from '@/hooks/useError';
import useMessages from '@/hooks/useMessages';

/**
 * 특정 롤링페이퍼 ID에 해당하는 메시지 목록을 표시하고 관리하는 리스트 컴포넌트입니다.
 * @param {object} props
 * @param {string} props.recipientId - 롤링페이퍼 수신자의 ID
 * @param {boolean} [props.isEditPage=false] - 현재 페이지가 편집 모드인지 여부
 * @returns {JSX.Element}
 */

const MessageList = ({ recipientId, isEditPage = false }) => {
  const { error } = useError();
  const { messages, loading, isFetching, nextUrl, fetchMore } =
    useMessages(recipientId);

  const observerRef = useRef(null);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

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
      {
        threshold: 1.0,
      }
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
    //  TODO: 메세지 삭제 로직 추가 필요
    //  여기에 실제 메시지 삭제 로직을 구현하세요.
    //  console.log는 린트 규칙 위반이므로 사용하지 마세요.
    //  messageId 변수를 사용하지 않으면 린트 경고가 발생하므로,
    //  임시로라도 사용 처리한 뒤, 나중에 실제 삭제 코드로 교체하세요.
    await Promise.resolve(messageId);
  };

  // 초기 로딩 상태일 때 skeleton UI 보여짐
  if (loading && !isFetching) {
    return (
      <div className="card-grid-style">
        {MESSAGE_LIST_SKELETON_ARRAY.map((_, index) => {
          return <MessageCardSkeleton key={index} />;
        })}
      </div>
    );
  }

  // 에러 났을 때 에러 메세지 화면에 보여짐
  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="card-grid-style">
        <AddMessageCardButton id={recipientId} />
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
            📝 롤링페이퍼 메세지를 불러오는 중...
          </div>
        )}
      </div>

      {/* 모달 추가 */}
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

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import MessageList from '@/components/rolling-paper-list/MessageList';

const PostDetail = () => {
  const { id } = useParams();

  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPostData({ id: id });
      setIsLoading(false);
    }, 100);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center">
        <p>로딩 중입니다...</p>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center">
        <p>데이터를 로드할 수 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-beige-200 wrapper-px min-h-[calc(100dvh-297px)] w-full">
        <div className="content pt-15 pb-25">
          {/* MessageList - 각 메시지 카드 클릭 시 모달이 자동으로 열림 */}
          <MessageList recipientId={id} />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PostDetail;

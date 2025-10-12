/**
 * MessageCard 컴포넌트의 로딩 상태를 표시하는 스켈레톤 UI입니다.
 * 부모의 그리드 컨테이너에 맞춰 유연하게 크기가 조절됩니다.
 * @returns {JSX.Element}
 */
const MessageCardSkeleton = () => {
  return (
    <div className="message-card-style flex-col items-start gap-4 p-6 pt-7">
      <div className="card-skeleton-style h-14 w-full" />
      <div className="flex w-full flex-grow flex-col gap-2">
        <div className="card-skeleton-style h-5 w-full" />
        <div className="card-skeleton-style h-5 w-11/12" />
        <div className="card-skeleton-style hidden h-5 w-10/12 sm:block" />
      </div>
      <div className="mt-auto w-20">
        <div className="card-skeleton-style h-4" />
      </div>
    </div>
  );
};

export default MessageCardSkeleton;

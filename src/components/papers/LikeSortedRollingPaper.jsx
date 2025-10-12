import RollingPaperList from '@/components/papers/RollingPaperList';
import useError from '@/hooks/useError';
import useRollingPaperData from '@/hooks/useRollingPaperData';

const LikeSortedRollingPaper = () => {
  const { error } = useError();
  const { data, loading } = useRollingPaperData('like');

  // 이 부분도 나중에 수정해보면 좋을 것 같습니다!
  if (error) {
    return <div className="text-error">에러가 발생했어요!</div>;
  }

  return <RollingPaperList data={data} loading={loading} />;
};

export default LikeSortedRollingPaper;

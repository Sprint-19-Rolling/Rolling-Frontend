import LinkButton from '@/components/common/button/LinkButton';
import FloatingButtonContainer from '@/components/common/FloatingButtonContainer';
import Title from '@/components/common/Title';
import LikeSortedRollingPaper from '@/components/papers/LikeSortedRollingPaper';
import RecentSortedRollingPaper from '@/components/papers/RecentSortedRollingPaper';
import { cn } from '@/utils/style';

const List = () => {
  const listStyle = 'flex flex-col gap-4';
  return (
    <div className="py-15 flex flex-col gap-6">
      <div className={listStyle}>
        <Title>인기 롤링 페이퍼 🔥</Title>
        <LikeSortedRollingPaper />
      </div>
      <div className={cn(listStyle, 'mt-6')}>
        <Title>최근에 만든 롤링 페이퍼 ⭐️️</Title>
        <RecentSortedRollingPaper />
      </div>
      <FloatingButtonContainer>
        <LinkButton to={'/post'} size={56} full="mobile">
          나도 만들어보기
        </LinkButton>
      </FloatingButtonContainer>
    </div>
  );
};

export default List;

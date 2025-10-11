import LinkButton from '@/components/common/button/LinkButton';
import FloatingButtonContainer from '@/components/common/FloatingButtonContainer';
import Title from '@/components/common/Title';
import RollingPaperList from '@/components/papers/RollingPaperList';

const List = () => {
  return (
    <div className="py-15 flex flex-col gap-12">
      <div>
        <Title>인기 롤링 페이퍼 🔥</Title>
        {/* TODO: 롤링페이퍼 인기순 리스트 적용하기 */}
      </div>
      <div>
        <Title>최근에 만든 롤링 페이퍼 ⭐️️</Title>
        <RollingPaperList />
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

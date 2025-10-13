import FloatingButtonContainer from '@/components/common/button/FloatingButtonContainer';
import LinkButton from '@/components/common/button/LinkButton';
import Error from '@/components/common/Error';
import Title from '@/components/common/Title';
import RollingPaperListContainer from '@/components/papers/RollingPaperListContainer';
import useError from '@/hooks/useError';

const List = () => {
  const { error } = useError();
  const listStyle = 'flex flex-col gap-4';

  if (error) {
    return <Error />;
  }

  return (
    <div className="md:py-15 mx-auto flex max-w-[1160px] flex-col gap-12 py-[50px]">
      <div className={listStyle}>
        <Title>인기 롤링 페이퍼 🔥</Title>
        <RollingPaperListContainer sort={'like'} />
      </div>
      <div className={listStyle}>
        <Title>최근에 만든 롤링 페이퍼 ⭐️️</Title>
        <RollingPaperListContainer />
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

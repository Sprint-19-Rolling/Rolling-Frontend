import LinkButton from '@/components/common/button/LinkButton';
import Title from '@/components/common/Title';

const List = () => {
  return (
    <div className="py-15 flex flex-col gap-12">
      <div>
        <Title>인기 롤링 페이퍼 🔥</Title>
        {/* TODO: 롤링페이퍼 인기순 리스트 적용하기 */}
      </div>
      <div>
        <Title>최근에 만든 롤링 페이퍼 ⭐️️</Title>
        {/* TODO: 롤링페이퍼 최신순 리스트 적용하기 */}
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex w-full justify-center bg-white px-5 py-6 sm:px-6 md:static">
        <LinkButton to={'/post'} size={56} full="mobile">
          나도 만들어보기
        </LinkButton>
      </div>
    </div>
  );
};

export default List;

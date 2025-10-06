import LinkButton from '@/components/common/button/LinkButton';
import ToggleSwitch from '@/components/common/button/Toggle';

const List = () => {
  return (
    // 🔥 post/:id vercel 체크용으로 추가한 버튼입니다. 삭제하셔도 됩니다!!
    <div className="flex gap-4 pt-8">
      <p>무한 스크롤 확인용</p>
      <LinkButton to="/post/13916" size={40}>
        post 테스트용 1
      </LinkButton>
      <p>빈 데이터 확인용</p>
      <LinkButton to="/post/13926" size={40}>
        post 테스트용 2
      </LinkButton>
      <p>에러 확인용</p>
      <LinkButton to="/post/13955" size={40}>
        post 테스트용 3
      </LinkButton>
      테스트용
      <ToggleSwitch />
    </div>
  );
};

export default List;

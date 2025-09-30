import images from '@/assets/images/images';
import LinkButton from '@/components/common/button/LinkButton';
import ServiceIntro from '@/components/main-page/ServiceIntro';

const Main = () => {
  return (
    <div className="md:pt-15 md:pb-25 relative flex flex-col items-center py-12 md:gap-6">
      <div className="flex w-full flex-col gap-9">
        <ServiceIntro
          introTag="Point. 01"
          introTitle="누구나 손쉽게,
        온라인 롤링 페이퍼를 만들 수 있어요"
          introDesc="로그인 없이 자유롭게 만들어요."
          image={images.mainImg1}
        />
        <ServiceIntro
          introTag="Point. 02"
          introTitle="서로에게 이모지로
        감정을 표현해보세요"
          introDesc="롤링 페이퍼에 이모지를 추가할 수 있어요."
          image={images.mainImg2}
          right
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex w-full justify-center bg-white px-5 py-6 sm:px-6 md:static">
        <LinkButton to={'/list'} size={56} full="tablet">
          구경해보기
        </LinkButton>
      </div>
    </div>
  );
};

export default Main;

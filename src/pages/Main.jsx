import LinkButton from '@/components/common/button/LinkButton';
import FloatingButtonContainer from '@/components/common/FloatingButtonContainer';
import ServiceIntro from '@/components/main/ServiceIntro';
import { SERVICE_INTRO_DATA } from '@/constants/main';

const Main = () => {
  return (
    <div className="md:pt-15 md:pb-25 relative flex flex-col items-center py-12 md:gap-6">
      <div className="flex w-full flex-col gap-9">
        {SERVICE_INTRO_DATA.map((item) => {
          return <ServiceIntro key={item.introTag} {...item} />;
        })}
      </div>
      <FloatingButtonContainer>
        <LinkButton to={'/list'} size={56} full="mobile">
          구경해보기
        </LinkButton>
      </FloatingButtonContainer>
    </div>
  );
};

export default Main;

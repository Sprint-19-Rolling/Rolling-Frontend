import FloatingButtonContainer from '@/components/common/button/FloatingButtonContainer';
import LinkButton from '@/components/common/button/LinkButton';
import ServiceIntro from '@/components/main/ServiceIntro';
import { SERVICE_INTRO_DATA } from '@/constants/main';

const Main = () => {
  return (
    <div className="md:pt-15 md:pb-25 relative flex flex-col items-center gap-9 py-12">
      {SERVICE_INTRO_DATA.map((item) => {
        return <ServiceIntro key={item.introTag} {...item} />;
      })}
      <FloatingButtonContainer>
        <LinkButton to={'/list'} size={56} full="mobile">
          구경해보기
        </LinkButton>
      </FloatingButtonContainer>
    </div>
  );
};

export default Main;

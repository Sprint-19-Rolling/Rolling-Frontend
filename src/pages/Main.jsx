import LinkButton from '@/components/common/button/LinkButton';
import ServiceIntro from '@/components/main-page/ServiceIntro';
import { SERVICE_INTRO_DATA } from '@/constants/main';

const Main = () => {
  return (
    <div className="md:pt-15 md:pb-25 relative flex flex-col items-center py-12 md:gap-6">
      <div className="flex w-full flex-col gap-9">
        {SERVICE_INTRO_DATA.map((item) => {
          return <ServiceIntro key={item.introTag} {...item} />;
        })}
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

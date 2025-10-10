import { cva } from 'class-variance-authority';
import Title from '@/components/common/Title';
import { cn } from '@/utils/style';

const serviceIntroVariants = cva(
  `flex w-full flex-col justify-between rounded-3xl bg-surface py-6 md:py-10 lg:flex-row lg:p-15 lg:pr-0`,
  {
    variants: {
      right: {
        true: 'lg:flex-row-reverse lg:justify-end lg:pl-0',
      },
    },
  }
);

/**
 * 메인페이지에 사용되는 서비스 소개 섹션 컴포넌트입니다.
 * 태그, 제목, 설명 텍스트와 이미지를 포함하며,
 * `right` prop을 통해 텍스트와 이미지의 레이아웃 방향을 전환할 수 있습니다.
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {string} props.introTag - 소개 섹션의 태그 텍스트 (필수)
 * @param {string} props.introTitle - 소개 섹션의 제목 텍스트 (필수)
 * @param {string} props.introDesc - 소개 섹션의 상세 설명 텍스트 (필수)
 * @param {string} props.image - 섹션 이미지의 URL (필수)
 * @param {string} props.imageAlt - 섹션 이미지의 대체 텍스트 (접근성) (필수)
 * @param {boolean} [props.right=false] - 이미지를 오른쪽에 배치하고 텍스트를 왼쪽에 배치할지 여부
 * @returns {JSX.Element} 서비스 소개 컴포넌트
 */
const ServiceIntro = ({
  introTag,
  introTitle,
  introDesc,
  image,
  imageAlt,
  right = false,
}) => {
  return (
    <section className={cn(serviceIntroVariants({ right }))}>
      <div className="mb-12 pl-6 md:mb-9 md:pl-10 lg:px-0">
        <span className="font-14-bold inline-flex h-7 items-center rounded-full bg-purple-600 px-3 text-white md:h-8">
          {introTag}
        </span>
        <Title className="font-18-bold mb-1 mt-4 whitespace-pre-line md:mb-2 md:whitespace-normal lg:whitespace-pre-line">
          {introTitle}
        </Title>
        <span className="font-15-regular md:font-18-regular text-gray-500">
          {introDesc}
        </span>
      </div>
      <img
        src={image}
        alt={imageAlt}
        className="h-auto w-full object-contain lg:max-w-[720px]"
      />
    </section>
  );
};

export default ServiceIntro;

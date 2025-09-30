import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
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
        loading="lazy"
      />
    </section>
  );
};

ServiceIntro.propTypes = {
  introTag: PropTypes.string.isRequired,
  introTitle: PropTypes.string.isRequired,
  introDesc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  right: PropTypes.bool,
};

export default ServiceIntro;

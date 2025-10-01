import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  `
    px-4 flex items-center justify-center gap-1 rounded-md cursor-pointer
    bg-white border border-gray-300
    disabled:border-0 disabled:bg-gray-300 disabled:text-white disabled:cursor-default
    hover:bg-gray-100
    focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-500
    active:bg-gray-100
    `,
  {
    variants: {
      theme: {
        primary: `
            bg-purple-600 text-white border-0
            hover:bg-purple-700
            focus-visible:bg-purple-800
            focus-visible:outline-2 focus-visible:outline-purple-900
            active:bg-purple-800
          `,
        secondary: `
            border-purple-600 text-purple-700
            hover:bg-purple-100 hover:border-purple-700
            focus-visible:outline-purple-900
            active:bg-purple-100 active:border-purple-800
          `,
        outlined: `
            text-gray-900
            `,
        icon: `
            p-1 text-gray-500
          `,
      },
      size: {
        28: 'min-w-7 h-7 font-14-regular',
        32: 'min-w-8 h-8 font-14-regular',
        36: 'min-w-9 h-9 font-16-medium',
        40: 'min-w-10 h-10 font-16-bold',
        56: 'w-70 h-14 rounded-2xl font-18-bold',
      },
      full: {
        mobile: 'w-full md:w-auto',
        tablet: 'w-full lg:w-auto',
        always: 'w-full',
      },
    },

    compoundVariants: [
      {
        size: 56,
        full: 'mobile',
        class: 'md:w-70',
      },
      {
        size: 56,
        full: 'tablet',
        class: 'lg:w-70',
      },
    ],
  }
);

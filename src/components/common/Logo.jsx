import Logo from '@/assets/logo/logo.svg?url';

const LogoComponent = () => {
  return (
    <a
      href="/"
      className="flex items-center gap-2 text-purple-600 no-underline">
      <img src={Logo} alt="Rolling Logo" className="h-[100px] w-[100px]" />
      <span className="font-poppins text-[19.97px] leading-[100%] font-bold text-[#4A494F]" />
    </a>
  );
};

export default LogoComponent;

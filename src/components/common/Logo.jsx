import { Link } from 'react-router-dom';
import LogoImage from '@/assets/logo/logo.svg?url';

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-purple-600 no-underline">
      <img src={LogoImage} alt="Rolling Logo" className="h-10" />
    </Link>
  );
};
export default Logo;

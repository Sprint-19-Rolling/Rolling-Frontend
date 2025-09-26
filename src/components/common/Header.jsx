import Logo from './Logo';
import NavLinks from './NavLinks';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <NavLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;

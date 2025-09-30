import { useLocation, Link } from 'react-router';
import icons from '@/assets/icons/icons';
import LogoAsset from '@/assets/logo/logo';
import LinkButton from '@/components/common/button/LinkButton';

const Header = () => {
  const location = useLocation();
  const isPostRelatedPage = location.pathname.startsWith('/post');

  return (
    <header className="wrapper-px sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="content">
        <div className="flex h-16 items-center justify-between">
          <Link to="/">
            <LogoAsset.Logo />
          </Link>

          {!isPostRelatedPage && (
            <nav>
              <LinkButton
                to="/post"
                size={40}
                theme="outlined"
                className="hidden transition md:flex">
                롤링 페이퍼 만들기
              </LinkButton>
              <LinkButton
                to="/post"
                theme="icon"
                className="transition md:hidden"
                aria-label="롤링 페이퍼 만들기">
                <icons.EditRolling width={32} height={32} />
              </LinkButton>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

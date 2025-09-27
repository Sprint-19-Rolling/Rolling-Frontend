import { useLocation, Link } from 'react-router';
import EditRolling from '@/assets/icons/icons';
import LogoAsset from '@/assets/logo/logo';

const Header = () => {
  const location = useLocation();
  const isPostRelatedPage = location.pathname.startsWith('/post');

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="flex h-16 items-center justify-between">
          <Link to="/">
            <LogoAsset.Logo />
          </Link>

          {!isPostRelatedPage && (
            <nav className="flex gap-8">
              <Link
                to="/post"
                className="font-pretendard hidden h-10 cursor-pointer items-center justify-center gap-[10px] rounded-[6px] border border-[#CCC] bg-white px-4 py-2 text-[16px] leading-[26px] font-bold tracking-[-0.16px] text-[#181818] transition hover:border-gray-900 hover:bg-gray-100 md:flex">
                롤링 페이퍼 만들기
              </Link>

              <Link
                to="/post"
                className="font-pretendard flex h-10 w-10 cursor-pointer items-center justify-center rounded-[6px] border border-[#CCC] bg-white transition hover:border-gray-900 md:hidden"
                aria-label="롤링페이퍼 만들기">
                <img
                  src={EditRolling}
                  alt="롤링페이퍼 만들기"
                  className="h-8 w-8"
                />
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

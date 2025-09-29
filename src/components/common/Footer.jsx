import logo from '@/assets/logo/logo';

const Footer = () => {
  return (
    <footer className="w-full bg-surface p-6 py-12 md:py-15">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 md:flex-row md:gap-30">
        <logo.Logo width={106} height={37} />
        <address className="flex flex-col gap-2 not-italic">
          <h3 className="font-16-bold text-gray-700">Sprint 19기 - 7팀</h3>
          <dl className="flex gap-2">
            <dt className="mr-1 footer-text-bold">팀원</dt>
            <dd className="footer-text">이아름</dd>
            <dd className="footer-text">양은지</dd>
            <dd className="footer-text">최희락</dd>
            <dd className="footer-text">차혁</dd>
            <dd className="footer-text">선기훈</dd>
          </dl>
          <ul className="flex items-center gap-3">
            {/* Todo: 시연영상, 발표 자료 완성 시 링크 추가 예정 */}
            <li>
              <a className="footer-link" href="#">
                시연영상
              </a>
            </li>
            <li className="footer-separator" aria-hidden="true">
              |
            </li>
            <li>
              <a className="footer-link" href="#">
                발표자료
              </a>
            </li>
            <li className="footer-separator" aria-hidden="true">
              |
            </li>
            <li>
              <a
                className="footer-link"
                href="https://github.com/Sprint-19-Rolling/Rolling-Frontend"
                target="_blank"
                rel="noopener noreferrer">
                Team Github
              </a>
            </li>
          </ul>
        </address>
      </div>
    </footer>
  );
};

export default Footer;

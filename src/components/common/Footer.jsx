import PropTypes from 'prop-types';
import logo from '@/assets/logo/logo';
import { FOOTER_LINKS, TEAM_MEMBERS } from '@/constants/footer';
import { cn } from '@/utils/style';

const Footer = ({ className }) => {
  return (
    <footer
      className={cn(
        `bg-surface wrapper-px md:py-15 w-full py-12 ${className}`
      )}>
      <div className="content md:gap-30 flex flex-col gap-4 md:flex-row">
        <logo.Logo width={106} height={37} />
        <address className="flex flex-col gap-2 not-italic">
          <h3 className="font-16-bold text-gray-700">Sprint 19기 - 7팀</h3>
          <dl className="flex gap-2">
            <dt className="footer-text-bold mr-1">팀원</dt>
            {TEAM_MEMBERS.map((member) => {
              return (
                <dd key={member} className="footer-text">
                  {member}
                </dd>
              );
            })}
          </dl>
          <ul className="flex items-center gap-3">
            {FOOTER_LINKS.map((link, idx) => {
              return (
                <li key={link.label} className="flex items-center">
                  <a
                    className="footer-link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer">
                    {link.label}
                  </a>
                  {idx < FOOTER_LINKS.length - 1 && (
                    <span className="footer-separator mx-2" aria-hidden="true">
                      |
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </address>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;

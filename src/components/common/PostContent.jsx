import DOMPurify from 'dompurify';
import { useMemo } from 'react';
import SANITIZE_CONFIG from '@/utils/sanitizeConfig';

const textStyle = (font) => {
  let fontClass;
  switch (font) {
    case 'Pretendard':
      fontClass = 'font-sans';
      break;
    case 'Noto Sans':
      fontClass = 'ff-noto';
      break;
    case '나눔명조':
      fontClass = 'ff-nanum-myeongjo';
      break;
    case '나눔손글씨 손편지체':
      fontClass = 'ff-nanum-sonpyeonji';
      break;
    default:
      fontClass = 'font-sans';
  }
  return `font-15-regular sm:font-18-regular text-gray-900 ${fontClass}`;
};

/**
 * React Quill 에디터의 HTML 값을 안전하게 출력하는 컴포넌트
 */
function PostContent({ htmlContent, font }) {
  const cleanHtml = useMemo(
    () => DOMPurify.sanitize(htmlContent, SANITIZE_CONFIG),
    [htmlContent]
  );

  return (
    <div
      className={`quill-content-view ${textStyle(font)}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

export default PostContent;

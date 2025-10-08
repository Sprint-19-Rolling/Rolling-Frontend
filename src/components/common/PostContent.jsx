import DOMPurify from 'dompurify';
import { useMemo } from 'react';
import SANITIZE_CONFIG from '@/utils/sanitizeConfig';

// ✅ 폰트 매핑 객체
const FONT_CLASSES = {
  Pretendard: 'font-sans',
  'Noto Sans': 'ff-noto',
  나눔명조: 'ff-nanum-myeongjo',
  '나눔손글씨 손편지체': 'ff-nanum-sonpyeonji',
};

// ✅ 간결해진 폰트 스타일 함수
const textStyle = (font) => {
  const fontClass = FONT_CLASSES[font] || 'font-sans';
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

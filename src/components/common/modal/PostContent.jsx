import DOMPurify from 'dompurify';
import { useMemo, useEffect, useRef } from 'react';
import { FONT_CLASSES, QUILL_FONT_CLASSES } from '@/constants/fontMap';
import { SANITIZE_CONFIG } from '@/constants/sanitizeConfig';

const textStyle = (font) => {
  const fontClass = FONT_CLASSES[font] || 'font-sans';
  // Tailwind의 기본 폰트 사이즈 클래스를 빼줘야 인라인 font-size가 적용됨
  return `${fontClass} text-gray-900`;
};

const PostContent = ({ htmlContent, font, className, card }) => {
  const contentRef = useRef(null);

  const cleanHtml = useMemo(() => {
    let sanitized = DOMPurify.sanitize(htmlContent, SANITIZE_CONFIG);

    // 기존 quill 체크박스 관련 span 제거 (유니코드 마커가 중복 생성되는 것을 방지)
    sanitized = sanitized.replace(/<span class="ql-ui".*?<\/span>/g, '');

    return sanitized;
  }, [htmlContent]);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) {
      return;
    }

    container.innerHTML = cleanHtml;

    // 🚨 1, 4번 문제 해결: 모든 리스트 항목(li)에 기준점과 텍스트 시작 위치 설정
    const listItems = container.querySelectorAll('li');
    listItems.forEach((li) => {
      // ql-ui의 absolute 기준점
      li.style.position = 'relative';
      // 텍스트가 겹치지 않도록 오른쪽으로 밀어냄
      li.style.paddingLeft = '1.5em';
    });

    // ✅ 리스트용 커스텀 UI 생성 및 위치 지정
    const lists = [
      // 1. 순서가 있는 리스트 (숫자)
      {
        selector: 'li[data-list="ordered"]',
        content: (index) => `${index + 1}. `,
      },
      // 3. 점 리스트
      { selector: 'li[data-list="bullet"]', content: () => ' • ' },

      // 2, 4. 체크 리스트: 유니코드 문자로 설정
      // 체크되지 않음: 흰색 네모
      {
        selector: 'li[data-list="unchecked"]',
        content: () => '☐ ',
        style: { color: '#1f2937' },
      },
      // ✅ 수정: 체크 완료 상태에서 색상(color) 제거.
      // 이제 ☑️ 문자는 텍스트와 동일한 색상(#1f2937)으로 표시됩니다.
      {
        selector: 'li[data-list="checked"]',
        content: () => '☑ ',
        style: { fontWeight: 'bold', color: 'rgb(31, 41, 55)' },
      },
    ];

    lists.forEach(({ selector, style }) => {
      const items = container.querySelectorAll(selector);
      items.forEach((li) => {
        // 이미 생성된 마커가 있다면 건너뜁니다. (안전 장치)
        if (li.querySelector('.ql-ui')) {
          return;
        }

        const ui = document.createElement('span');
        ui.className = 'ql-ui';

        if (style) {
          Object.assign(ui.style, style);
        }

        li.prepend(ui);
      });
    });
  }, [cleanHtml]);

  const quillFontClass = QUILL_FONT_CLASSES[font] || '';

  return (
    <div
      ref={contentRef}
      className={`ql-editor w-full ${textStyle(font)} ${quillFontClass} ${className}`}
      style={{
        padding: 0,
        ...(card
          ? {
              overflow: 'hidden',
            }
          : {}),
      }}
    />
  );
};

export default PostContent;

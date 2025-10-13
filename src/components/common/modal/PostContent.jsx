import DOMPurify from 'dompurify';
import { useMemo, useEffect, useRef } from 'react';
import { FONT_CLASSES, QUILL_FONT_CLASSES } from '@/constants/fontMap';
import { SANITIZE_CONFIG } from '@/constants/sanitizeConfig';

const textStyle = (font) => {
  const fontClass = FONT_CLASSES[font] || 'font-sans';

  return `${fontClass} text-gray-900`;
};

const PostContent = ({ htmlContent, font, className, card }) => {
  const contentRef = useRef(null);

  const cleanHtml = useMemo(() => {
    let sanitized = DOMPurify.sanitize(htmlContent, SANITIZE_CONFIG);

    sanitized = sanitized.replace(/<span class="ql-ui".*?<\/span>/g, '');

    return sanitized;
  }, [htmlContent]);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) {
      return;
    }

    container.innerHTML = cleanHtml;

    const listItems = container.querySelectorAll('li');
    listItems.forEach((li) => {
      li.style.position = 'relative';

      li.style.paddingLeft = '1.5em';
    });

    const lists = [
      {
        selector: 'li[data-list="ordered"]',
        content: (index) => `${index + 1}. `,
      },

      { selector: 'li[data-list="bullet"]', content: () => ' • ' },

      {
        selector: 'li[data-list="unchecked"]',
        content: () => '☐ ',
        style: { color: '#1f2937' },
      },

      {
        selector: 'li[data-list="checked"]',
        content: () => '☑ ',
        style: { fontWeight: 'bold', color: 'rgb(31, 41, 55)' },
      },
    ];

    lists.forEach(({ selector, style }) => {
      const items = container.querySelectorAll(selector);
      items.forEach((li) => {
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
